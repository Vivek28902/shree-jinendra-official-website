import { createClient } from '@supabase/supabase-js';

const url = 'https://ifscxwuevlmjvudjtrqu.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmc2N4d3VldmxtanZ1ZGp0cnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTM0ODcsImV4cCI6MjA5MDAyOTQ4N30.SGByXsFRq-OneRgKYgT5Zo4OKtAEFYIcpDSp74JWk1k';

const supabase = createClient(url, key);

async function test() {
  console.log("Testing update to site_configs...");
  let { error } = await supabase.from('site_configs').upsert({ id: 'primary', data: { test: true }, updated_at: new Date().toISOString() });
  if (error) {
    console.error("UPDATE ERROR:", error.message, error.code, error.details);
  } else {
    console.log("UPDATE SUCCESS!");
  }
}

test();
