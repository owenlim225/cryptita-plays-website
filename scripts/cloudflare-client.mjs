import { execFileSync } from "node:child_process";

// Capture credentials in memory. Never print them, write them to the repository,
// or pass them as shell arguments. Wrangler handles OAuth refresh.
const auth = process.env.CLOUDFLARE_API_TOKEN
  ? { token: process.env.CLOUDFLARE_API_TOKEN }
  : JSON.parse(execFileSync(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "auth", "token", "--json"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
if (!auth.token) throw new Error("Run wrangler login or set CLOUDFLARE_API_TOKEN");

export async function cloudflareRequest(endpoint, options = {}, bodyFactory) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4${endpoint}`, {
        ...options, headers: { ...options.headers, Authorization: `Bearer ${auth.token}` },
        ...(bodyFactory ? { body: bodyFactory(), duplex: "half" } : {}),
        signal: AbortSignal.timeout(120_000),
      });
      if (response.status === 429 || response.status >= 500) {
        await response.body?.cancel();
        throw new Error(`Cloudflare HTTP ${response.status}`);
      }
      return response;
    } catch (error) {
      if (attempt === 5) throw error;
      console.log(`Cloudflare request retry ${attempt}/5: ${endpoint}`);
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
}

export async function accountId() {
  if (process.env.CLOUDFLARE_ACCOUNT_ID) return process.env.CLOUDFLARE_ACCOUNT_ID;
  const response = await cloudflareRequest("/zones?name=cryptitaplays.com");
  const json = await response.json();
  if (!json.success || json.result.length !== 1) throw new Error("Cannot uniquely resolve the cryptitaplays.com account");
  return json.result[0].account.id;
}
