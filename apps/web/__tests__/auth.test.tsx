import { createClient } from '@supabase/supabase-js';

describe('Supabase Auth Integration', () => {
  it('logs in test user with signInWithPassword', async () => {
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
    const testEmail = process.env.TEST_USER_EMAIL as string;
    const testPassword = process.env.TEST_USER_PASSWORD as string;

    expect(supabaseUrl).toBeTruthy();
    expect(supabaseAnonKey).toBeTruthy();
    expect(testEmail).toBeTruthy();
    expect(testPassword).toBeTruthy();

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    expect(error).toBeNull();
    expect(data.user).toBeDefined();
  });
}); 