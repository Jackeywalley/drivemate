-- Create test users
DO $$
DECLARE
    admin_id uuid;
    driver_id uuid;
    client_id uuid;
BEGIN
    -- Create admin user
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'admin@drivemate.com',
        crypt('Admin@123', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"first_name":"Admin","last_name":"User","phone_number":"+1234567890","role":"admin"}',
        false,
        '',
        '',
        '',
        ''
    ) RETURNING id INTO admin_id;

    -- Create driver user
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'driver@drivemate.com',
        crypt('Driver@123', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"first_name":"John","last_name":"Driver","phone_number":"+1234567891","role":"driver"}',
        false,
        '',
        '',
        '',
        ''
    ) RETURNING id INTO driver_id;

    -- Create client user
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'client@drivemate.com',
        crypt('Client@123', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"first_name":"Jane","last_name":"Client","phone_number":"+1234567892","role":"customer"}',
        false,
        '',
        '',
        '',
        ''
    ) RETURNING id INTO client_id;

    -- Update profiles
    UPDATE profiles 
    SET role = 'admin',
        first_name = 'Admin',
        last_name = 'User',
        phone_number = '+1234567890'
    WHERE id = 'f4546dcb-9c71-4760-920a-b93929d49bcd';

    UPDATE profiles 
    SET role = 'driver',
        first_name = 'John',
        last_name = 'Driver',
        phone_number = '+1234567891'
    WHERE id = '3654014f-2a17-415d-aa9b-0b0040879517';

    UPDATE profiles 
    SET role = 'customer',
        first_name = 'Jane',
        last_name = 'Client',
        phone_number = '+1234567892'
    WHERE id = '6d0a0503-ad01-43fe-b342-b7769f4de166';

    -- Create driver profile
    INSERT INTO driver_profiles (id, license_number, vehicle_type, vehicle_plate)
    VALUES ('3654014f-2a17-415d-aa9b-0b0040879517', 'DL123456', 'Luxury Sedan', 'ABC123');

    -- Log the created user IDs
    RAISE NOTICE 'Created users with IDs: Admin: %, Driver: %, Client: %', 'f4546dcb-9c71-4760-920a-b93929d49bcd', '3654014f-2a17-415d-aa9b-0b0040879517', '6d0a0503-ad01-43fe-b342-b7769f4de166';
END $$; 