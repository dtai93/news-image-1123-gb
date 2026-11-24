import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
const server = createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "");
    if (!rel || rel.includes("..")) { res.writeHead(403); return res.end(); }
    const data = await readFile(join(root, rel));
    res.writeHead(200, { "Content-Type": types[extname(rel)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404); res.end("no");
  }
});
server.listen(18842, "127.0.0.1", () => {
  const shot = spawn("timeout", ["90", "node", "/home/box/makefun/tools/shot.mjs",
    "http://127.0.0.1:18842/build/page.html", join(root, "build/raw.png"), "1024", "1024", "18841"],
    { stdio: "inherit" });
  shot.on("exit", (code) => { server.close(); process.exit(code ?? 1); });
});
