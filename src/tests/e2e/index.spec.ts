import { test, expect } from "@playwright/test";
test("has title Skrivert", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/Skrivert/);
})
