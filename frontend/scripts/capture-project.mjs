/**
 * Capture a genuine screenshot of a public deployment or your locally running app.
 * Requires: npm install && npm run screenshots:install
 * Default captures Gaming Gear's public storefront only.
 * Custom: npm run capture:project -- --id solar-chatbot --url http://localhost:5173
 * Never log in with personal accounts to capture screenshots you plan to publish.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "public/project-shots");
const configPath = path.join(root, "src/data/project-shots.json");
const allowedIds = new Set([
  "gaming-store",
  "solar-chatbot",
  "anime-bot",
  "meeting-summary",
  "food-app",
]);
function arg(flag, fallback) {
  const pos = process.argv.indexOf(flag);
  return pos !== -1 ? process.argv[pos + 1] : fallback;
}
const id = arg("--id", "gaming-store");
const target = arg(
  "--url",
  id === "gaming-store" ? "https://ecom-web-kohl-mu.vercel.app/" : "",
);
if (!allowedIds.has(id)) {
  console.error(
    `Unknown project id: ${id}. Allowed: ${[...allowedIds].join(", ")}`,
  );
  process.exit(1);
}
if (!target) {
  console.error("Missing --url (for example: http://localhost:5173).");
  process.exit(1);
}
let url;
try {
  url = new URL(target);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("HTTP(S) only");
} catch {
  console.error("Invalid URL. Use an http:// or https:// address.");
  process.exit(1);
}
await fs.mkdir(shotsDir, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const configs = [
    {
      suffix: "desktop",
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1,
    },
    {
      suffix: "mobile",
      viewport: { width: 390, height: 844 },
      isMobile: true,
      deviceScaleFactor: 1,
    },
  ];
  const paths = [];
  for (const conf of configs) {
    const context = await browser.newContext({
      viewport: conf.viewport,
      isMobile: conf.isMobile,
      deviceScaleFactor: conf.deviceScaleFactor,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const response = await page.goto(url.toString(), {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForFunction(
      () => (document.body?.innerText || "").trim().length > 30,
      null,
      { timeout: 16000 },
    );
    await page.waitForTimeout(1200); // let images/fonts settle
    const body = (await page.locator("body").innerText()).trim();
    if (
      !body ||
      /^(application error|404:|this site can.t be reached)/i.test(body)
    ) {
      throw new Error(
        "Page appears to be an error or an empty shell — screenshot not saved",
      );
    }
    if (response?.status() >= 400)
      throw new Error(`Page returned ${response.status()}`);
    const filename = `${id}-${conf.suffix}.png`;
    const filepath = path.join(shotsDir, filename);
    await page.screenshot({
      path: filepath,
      fullPage: false,
      animations: "disabled",
    });
    paths.push(`/project-shots/${filename}`);
    console.log(`Captured ${conf.suffix}: ${filepath}`);
    await context.close();
  }
  const data = JSON.parse(await fs.readFile(configPath, "utf8"));
  data[id] = paths;
  await fs.writeFile(configPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(
    `Registered screenshots for ${id}. Restart dev server or refresh the page.`,
  );
} catch (err) {
  console.error(`Screenshot failed: ${err.message}`);
  console.error(
    "Please make sure the site is running, publicly reachable, and Chromium is installed.",
  );
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}
