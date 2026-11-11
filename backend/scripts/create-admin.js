import 'dotenv/config';
import { getSupabaseClient } from '../src/config/supabase.js';
import { hashPassword, normalizeEmail } from '../src/utils/auth.js';

const ADMIN_EMAIL = normalizeEmail(process.env.ADMIN_EMAIL || 'admin123@gmail.com');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123@';
const ADMIN_NAME = process.env.ADMIN_NAME || 'BLUENEEDLE Admin';

async function main() {
  const supabase = getSupabaseClient();
  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  const { data, error } = await supabase
    .from('users')
    .upsert(
      [
        {
          account_type: 'b2b',
          full_name: ADMIN_NAME,
          professional_role: 'Operations Administrator',
          organization_name: 'BLUENEEDLE Surgical',
          export_jurisdiction: 'International',
          email: ADMIN_EMAIL,
          password_hash: passwordHash,
          role: 'admin',
          authority_attested: true,
          metallurgy_updates_opt_in: true,
          verification_status: 'verified',
          is_active: true,
        },
      ],
      { onConflict: 'email' }
    )
    .select('id, email, full_name, role, is_active')
    .single();

  if (error) {
    console.error('Failed to upsert admin user:', error.message);
    process.exit(1);
  }

  console.log('Admin user ready:', data);
}

main();
