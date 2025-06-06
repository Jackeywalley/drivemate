import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

// Create Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testUsers = [
  {
    email: 'admin@drivemate.com',
    password: 'Admin@123',
    metadata: {
      first_name: 'Admin',
      last_name: 'User',
      phone_number: '+1234567890',
      role: 'admin'
    }
  },
  {
    email: 'driver@drivemate.com',
    password: 'Driver@123',
    metadata: {
      first_name: 'John',
      last_name: 'Driver',
      phone_number: '+1234567891',
      role: 'driver'
    },
    driverProfile: {
      license_number: 'DL123456',
      vehicle_type: 'Luxury Sedan',
      vehicle_plate: 'ABC123'
    }
  },
  {
    email: 'client@drivemate.com',
    password: 'Client@123',
    metadata: {
      first_name: 'Jane',
      last_name: 'Client',
      phone_number: '+1234567892',
      role: 'customer'
    }
  }
];

async function createTestUsers() {
  console.log('Starting to create test users...');
  console.log('Using Supabase URL:', supabaseUrl);

  for (const user of testUsers) {
    try {
      console.log(`\nCreating user: ${user.email}`);
      
      // Create auth user with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: user.metadata
        }
      });

      if (authError) {
        console.error(`Error creating auth user for ${user.email}:`, authError);
        continue;
      }

      if (!authData.user) {
        console.error(`No user data returned for ${user.email}`);
        continue;
      }

      const userId = authData.user.id;
      console.log(`Created auth user with ID: ${userId}`);

      // Update profile with role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: user.metadata.role })
        .eq('id', userId);

      if (profileError) {
        console.error(`Error updating profile for ${user.email}:`, profileError);
        continue;
      }

      console.log(`Updated profile for ${user.email}`);

      // Create driver profile if applicable
      if (user.driverProfile) {
        const { error: driverProfileError } = await supabase
          .from('driver_profiles')
          .insert({
            id: userId,
            ...user.driverProfile
          });

        if (driverProfileError) {
          console.error(`Error creating driver profile for ${user.email}:`, driverProfileError);
          continue;
        }

        console.log(`Created driver profile for ${user.email}`);
      }

      console.log(`Successfully created user: ${user.email}`);
    } catch (error) {
      console.error(`Unexpected error creating user ${user.email}:`, error);
    }
  }

  console.log('\nFinished creating test users.');
}

// Run the script
createTestUsers().catch(console.error); 