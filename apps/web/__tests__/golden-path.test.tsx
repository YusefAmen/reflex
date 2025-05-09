import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
const testEmail = process.env.TEST_USER_EMAIL as string;
const testPassword = process.env.TEST_USER_PASSWORD as string;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

describe('Frontend Golden Path', () => {
  it('logs in, fetches projects/logs, creates reaction, fetches complaints', async () => {
    // 1. Log in
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    expect(error).toBeNull();
    expect(data.user).toBeDefined();
    const accessToken = data.session?.access_token;
    expect(accessToken).toBeTruthy();

    // 2. Fetch projects (stubbed, so skip or simulate)
    // 3. Fetch logs
    const logsResp = await fetch(`${backendUrl}/api/logs/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(logsResp.status).toBe(200);
    const logs = await logsResp.json();
    expect(Array.isArray(logs)).toBe(true);

    // 4. Create a reaction
    const reactionPayload = {
      projectId: '11111111-1111-1111-1111-111111111111',
      event: 'error',
      threshold: 5,
      window_minutes: 10,
      action: 'email',
    };
    const reactionResp = await fetch(`${backendUrl}/api/reactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reactionPayload),
    });
    expect(reactionResp.status).toBe(200);
    const reactionData = await reactionResp.json();
    expect(reactionData.status).toBe('created');

    // 5. Fetch complaints
    const complaintsResp = await fetch(`${backendUrl}/api/complaints/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(complaintsResp.status).toBe(200);
    const complaints = await complaintsResp.json();
    expect(Array.isArray(complaints)).toBe(true);
  });
}); 