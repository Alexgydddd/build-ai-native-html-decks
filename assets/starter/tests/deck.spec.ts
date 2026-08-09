import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

test("renders every slide without overflow or console errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("/");
  await page.waitForFunction(() => window.__deckReady === true);
  await page.evaluate(() => {
    (window as unknown as { Reveal: { configure: (options: object) => void } }).Reveal.configure({
      transition: "none",
      backgroundTransition: "none",
    });
  });

  const slides = page.locator(".reveal .slides > section");
  const count = await slides.count();
  expect(count).toBeGreaterThan(0);

  const outputDir = path.resolve("outputs/slides");
  await fs.mkdir(outputDir, { recursive: true });

  for (let index = 0; index < count; index += 1) {
    await page.evaluate((slideIndex) => window.Reveal.slide(slideIndex), index);
    await page.waitForTimeout(80);

    const slide = slides.nth(index);
    await expect(slide).toHaveClass(/present/);
    await expect(slide.locator("h1")).toBeVisible();
    const size = await slide.evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
    }));
    expect(size.scrollWidth, `horizontal overflow on slide ${index + 1}`).toBeLessThanOrEqual(size.clientWidth + 2);
    expect(size.scrollHeight, `vertical overflow on slide ${index + 1}`).toBeLessThanOrEqual(size.clientHeight + 2);

    await page.screenshot({
      path: path.join(outputDir, `slide-${String(index + 1).padStart(2, "0")}.png`),
    });
  }

  expect(consoleErrors).toEqual([]);
});
