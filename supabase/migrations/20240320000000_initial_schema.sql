-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'driver', 'admin');
CREATE TYPE ride_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'customer',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create driver_profiles table
CREATE TABLE public.driver_profiles (
    id UUID REFERENCES public.profiles(id) PRIMARY KEY,
    license_number TEXT NOT NULL,
    vehicle_type TEXT NOT NULL,
    vehicle_plate TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create rides table
CREATE TABLE public.rides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) NOT NULL,
    driver_id UUID REFERENCES public.driver_profiles(id),
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    pickup_coordinates POINT,
    dropoff_coordinates POINT,
    status ride_status DEFAULT 'pending',
    scheduled_time TIMESTAMP WITH TIME ZONE,
    actual_pickup_time TIMESTAMP WITH TIME ZONE,
    actual_dropoff_time TIMESTAMP WITH TIME ZONE,
    distance DECIMAL(10,2),
    duration INTEGER,
    base_fare DECIMAL(10,2),
    total_fare DECIMAL(10,2),
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create payments table
CREATE TABLE public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ride_id UUID REFERENCES public.rides(id) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create ratings table
CREATE TABLE public.ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ride_id UUID REFERENCES public.rides(id) NOT NULL,
    rating_by UUID REFERENCES public.profiles(id) NOT NULL,
    rating_for UUID REFERENCES public.profiles(id) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Driver profiles policies
CREATE POLICY "Anyone can view verified driver profiles"
    ON public.driver_profiles FOR SELECT
    USING (true);

CREATE POLICY "Drivers can view their own profile"
    ON public.driver_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Drivers can update their own profile"
    ON public.driver_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Drivers can insert their own profile"
    ON public.driver_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Rides policies
CREATE POLICY "Users can view their own rides"
    ON public.rides FOR SELECT
    USING (auth.uid() = customer_id OR auth.uid() = driver_id);

CREATE POLICY "Users can create rides"
    ON public.rides FOR INSERT
    WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own rides"
    ON public.rides FOR UPDATE
    USING (auth.uid() = customer_id OR auth.uid() = driver_id);

-- Payments policies
CREATE POLICY "Users can view their own payments"
    ON public.payments FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.rides
        WHERE rides.id = payments.ride_id
        AND (rides.customer_id = auth.uid() OR rides.driver_id = auth.uid())
    ));

-- Ratings policies
CREATE POLICY "Anyone can view ratings"
    ON public.ratings FOR SELECT
    USING (true);

CREATE POLICY "Users can create ratings for their rides"
    ON public.ratings FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.rides
        WHERE rides.id = ratings.ride_id
        AND (rides.customer_id = auth.uid() OR rides.driver_id = auth.uid())
    ));

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create a profile if one doesn't exist
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = new.id) THEN
        INSERT INTO public.profiles (id, role, first_name, last_name, phone_number)
        VALUES (
            new.id,
            'customer',
            COALESCE(new.raw_user_meta_data->>'first_name', 'New'),
            COALESCE(new.raw_user_meta_data->>'last_name', 'User'),
            COALESCE(new.raw_user_meta_data->>'phone_number', '+1234567890')
        );
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 