import { test, expect } from "@playwright/test";
import { removeTestUserByEmail } from "../pb_tools/removeuser"
test("has title Skrivert", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/Skrivert/);
});

test("register testuser1", async ({ page }) => {
  await removeTestUserByEmail("test1@qwertyist.se")
  await page.goto("http://localhost:5173/user/register");
  await page.waitForTimeout(2000);
  await page.getByLabel("Användarnamn").click();
  await page.getByLabel("Användarnamn").fill("testuser1");
  await page.waitForTimeout(2000);
  await page.getByLabel("Användarnamn").press("Tab");
  await page.getByLabel("E-postadress").fill("test1@qwertyist.se");
  await page.waitForTimeout(2000);
  await page.getByLabel("E-postadress").press("Tab");
  await page.getByLabel("Lösenord", { exact: true }).fill("abcd1234");
  await page.waitForTimeout(2000);
  await page.getByLabel("Lösenord", { exact: true }).press("Tab");
  await page.getByLabel("Bekräfta lösenord").fill("abcd1234");
  await page.waitForTimeout(2000);
  await page.getByLabel("Bekräfta lösenord").press("Tab");
  await page.waitForTimeout(2000);
  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();
});
