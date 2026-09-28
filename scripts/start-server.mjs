import { existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

const serverDirectory = join(process.cwd(), "build", "server");
const directEntry = join(serverDirectory, "index.js");
const bundleEntries = existsSync(serverDirectory)
  ? readdirSync(serverDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(serverDirectory, entry.name, "index.js"))
      .filter(existsSync)
  : [];
const entries = existsSync(directEntry) ? [directEntry] : bundleEntries;

if (entries.length !== 1) {
  console.error("Expected one React Router server build. Run `pnpm build` first.");
  process.exit(1);
}

const require = createRequire(import.meta.url);
const servePackage = require.resolve("@react-router/serve/package.json");
const serveBinary = join(dirname(servePackage), "bin.js");
const server = spawn(process.execPath, [serveBinary, entries[0]], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("exit", (code) => process.exit(code ?? 1));
