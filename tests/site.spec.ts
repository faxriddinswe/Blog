import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["", "/about", "/projects", "/blog", "/lectures", "/courses", "/certificates", "/offer-letters"];

test.describe("every page", () => {
  for (const lang of ["uz", "en"] as const) {
    for (const p of pages) {
      const path = `/${lang}${p}`;
      test(`${path}: one h1, lang, no serious axe issues, safe external links`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        await page.goto(path);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("title")).not.toBeEmpty();

        for (const theme of ["dark", "light"]) {
          await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
          // Let the 0.3s colour transitions finish, or axe measures mid-fade colours.
          await page.waitForTimeout(450);
          const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
          const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
          expect(bad.map((v) => `${theme}: ${v.id} → ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        }

        const external = page.locator('a[href^="http"]:not([href*="faxriddinswe.uz"])');
        for (const a of await external.all()) {
          await expect(a).toHaveAttribute("target", "_blank");
          await expect(a).toHaveAttribute("rel", "noopener noreferrer");
        }
        for (const img of await page.locator("img").all()) {
          expect(await img.getAttribute("alt")).not.toBeNull();
        }
        expect(errors).toEqual([]);
      });
    }
  }
});

test("root redirects by browser language", async ({ browser }) => {
  for (const [locale, expected] of [["en-US", "/en"], ["uz-UZ", "/uz"], ["ru-RU", "/uz"]] as const) {
    const ctx = await browser.newContext({ locale });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(new RegExp(`${expected}$`));
    await ctx.close();
  }
});

test("saved language wins on /", async ({ page, isMobile }) => {
  await page.goto("/uz");
  if (isMobile) {
    await page.getByRole("button", { name: "Menyuni ochish" }).click();
    await page.locator("dialog [data-set-lang=en]").click();
  } else {
    await page.locator("header .lang [data-set-lang=en]").first().click();
  }
  await expect(page).toHaveURL(/\/en$/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/uz/certificates");
  if (isMobile) {
    await page.getByRole("button", { name: "Menyuni ochish" }).click();
    await page.locator("dialog").getByRole("link", { name: "English" }).click();
  } else {
    await page.getByRole("group", { name: "Til" }).getByRole("link", { name: "EN" }).click();
  }
  await expect(page).toHaveURL(/\/en\/certificates$/);
});

test("theme toggle persists after reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
});

test("theme follows the system on first visit", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("nav links go to the right pages", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Main menu" }).first();
    for (const [name, path] of [["About", "/en/about"], ["Projects", "/en/projects"], ["Blog", "/en/blog"], ["Lectures", "/en/lectures"]]) {
      await nav.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("Learning dropdown works with the mouse", async ({ page }) => {
    await page.goto("/en");
    const btn = page.getByRole("button", { name: "Learning" });
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("link", { name: "Certificates" }).click();
    await expect(page).toHaveURL(/\/en\/certificates$/);
    // Outside click closes it.
    await page.getByRole("button", { name: "Learning" }).click();
    await page.locator("h1").click();
    await expect(page.getByRole("button", { name: "Learning" })).toHaveAttribute("aria-expanded", "false");
  });

  test("Learning dropdown works with the keyboard", async ({ page }) => {
    await page.goto("/en");
    const btn = page.getByRole("button", { name: "Learning" });
    await btn.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("link", { name: "Courses" })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("link", { name: "Certificates" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(btn).toBeFocused();
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/courses$/);
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, traps focus, closes on Esc, outside tap and link click", async ({ page }) => {
    await page.goto("/en");
    const open = page.getByRole("button", { name: "Open menu" });
    const dialog = page.locator("dialog#mobile-menu");

    await open.click();
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 20; i++) await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();

    await open.click();
    const box = (await dialog.boundingBox())!;
    await page.mouse.click(box.width / 2, box.y + box.height + 40);
    await expect(dialog).toBeHidden();

    await open.click();
    await dialog.getByRole("link", { name: "Offer Letters" }).click();
    await expect(page).toHaveURL(/\/en\/offer-letters$/);
    await expect(page.locator("dialog#mobile-menu")).toBeHidden();
  });
});

test("lightbox opens and closes with Esc", async ({ page }) => {
  await page.goto("/en/certificates");
  const trigger = page.getByRole("button", { name: /Enlarge the Startup School certificate/ });
  await trigger.click();
  const dialog = page.locator("dialog[data-lightbox-dialog]");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveJSProperty("complete", true);
  expect(await dialog.locator("img").evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("resume opens in a new tab instead of downloading", async ({ page, context }) => {
  await page.goto("/en");
  const link = page.getByRole("link", { name: /Download Resume/ });
  await expect(link).toHaveAttribute("target", "_blank");
  expect(await link.getAttribute("download")).toBeNull();
  const [tab] = await Promise.all([context.waitForEvent("page"), link.click()]);
  await expect(tab).toHaveURL(/\/resume\.pdf$/);
});

test("resume is served and 404 works", async ({ request }) => {
  expect((await request.get("/resume.pdf")).status()).toBe(200);
  expect((await request.get("/does-not-exist")).status()).toBe(404);
});
