-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create new function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create a profile if one doesn't exist
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = new.id) THEN
        INSERT INTO public.profiles (
            id,
            role,
            first_name,
            last_name,
            phone_number
        )
        VALUES (
            new.id,
            COALESCE((new.raw_user_meta_data->>'role')::user_role, 'customer'),
            COALESCE(new.raw_user_meta_data->>'first_name', 'New'),
            COALESCE(new.raw_user_meta_data->>'last_name', 'User'),
            COALESCE(new.raw_user_meta_data->>'phone_number', '+1234567890')
        );
    END IF;
    RETURN new;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add policy to allow service role to bypass RLS
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
CREATE POLICY "Service role can bypass RLS"
    ON public.profiles
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Add policy to allow authenticated users to create their own profile
CREATE POLICY "Authenticated users can create their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Add policy to allow service role to create profiles
CREATE POLICY "Service role can create profiles"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role'); 