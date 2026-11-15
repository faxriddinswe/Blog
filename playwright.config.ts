import { defineConfig, devices } from "@playwright/test";

const channel = process.env.CHROME_PATH ? undefined : "chrome";
const launchOptions = { executablePath: process.env.CHROME_PATH };

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:4321", trace: "off" },
  webServer: {
    command: "pnpm preview --port 4321 --host 127.0.0.1",
    url: "http://127.0.0.1:4321/uz",
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel, launchOptions } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel, launchOptions } },
  ],
});
