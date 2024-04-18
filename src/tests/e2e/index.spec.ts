import { test, expect } from "@playwright/test";
import { removeTestUserByEmail } from "../pb_tools/removeuser";
test("has title Skrivert", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/Skrivert/);
});

test("register testuser1 [first]", async ({ page }) => {
  await removeTestUserByEmail("test1@qwertyist.se")
  await page.goto("http://localhost:5173/user/register");
  await expect(page).toHaveTitle(/Skrivert | Registrera konto/);
  await page.getByLabel("Användarnamn").click();
  await page.getByLabel("Användarnamn").fill("testuser1");
  await page.getByLabel("Användarnamn").press("Tab");
  await page.getByLabel("E-postadress").fill("test1@qwertyist.se");
  await page.getByLabel("E-postadress").press("Tab");
  await page.getByLabel("Lösenord", { exact: true }).fill("abcd1234");
  await page.getByLabel("Lösenord", { exact: true }).press("Tab");
  await page.getByLabel("Bekräfta lösenord").fill("abcd1234");
  await page.getByLabel("Bekräfta lösenord").press("Tab");
  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();
  await expect(page).toHaveTitle(/Skrivert/);
});

test("register testuser1 [second]", async ({ page }) => {
  await page.goto("http://localhost:5173/user/register");
  await expect(page).toHaveTitle(/Skrivert | Registrera konto/);
  await page.getByLabel("Användarnamn").click();
  await page.getByLabel("Användarnamn").fill("testuser1");
  await page.getByLabel("Användarnamn").press("Tab");
  await page.getByLabel("E-postadress").fill("test1@qwertyist.se");
  await page.getByLabel("E-postadress").press("Tab");
  await page.getByLabel("Lösenord", { exact: true }).fill("abcd1234");
  await page.getByLabel("Lösenord", { exact: true }).press("Tab");
  await page.getByLabel("Bekräfta lösenord").fill("abcd1234");
  await page.getByLabel("Bekräfta lösenord").press("Tab");
  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();
  await expect(page.getByRole("heading", { name: "Fel vid registrering"})).toBeVisible();
});

test("login with testuser1 then logout", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Skrivert/);
  await page.getByRole('link', { name: 'Logga in' }).click();
  await expect(page).toHaveTitle(/Skrivert | Logga in/);
  await page.getByLabel('Användarnamn').click();
  await page.getByLabel('Användarnamn').fill('testuser1');
  await page.getByLabel('Användarnamn').press('Tab');
  await page.getByLabel('Lösenord').fill('abcd1234');
  await page.getByLabel('Lösenord').press('Enter');
  await page.getByRole('button', { name: 'Logga ut' }).click();
  await page.getByRole('link', { name: 'Logga in' }).click();
});

test("login with testuser1 then write sample text", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Logga in" }).click();
  await expect(page).toHaveTitle(/Skrivert | Logga in/);
  await page.getByLabel("Användarnamn").click();
  await page.getByLabel("Användarnamn").fill("test1@qwertyist.se");
  await page.getByLabel("Användarnamn").press("Tab");
  await page.getByLabel("Lösenord").fill("abcd1234");
  await page.getByLabel("Lösenord").press("Enter");
  await page.locator("#doc").click();
  await page.keyboard.type("Jag testar att skriva några förkr");
  await page.keyboard.press("Period");
  await page.keyboard.press("Space");
  await page.keyboard.type("Det är gka coolt och");
  await page.keyboard.press("Space");
  await page.keyboard.type("ett ärofyllt utvs ");
  await page.keyboard.press("Backspace");
  await page.keyboard.type("uppdrag.");
  await page.keyboard.press("Space");
  const subtitle = page.getByRole("textbox").nth(1);
 expect(await subtitle.inputValue()).toBe(
    "Jag testar att skriva några\nförkortningar. Det är ganska coolt-\n\n-och ett ärofyllt utvecklingsuppdrag.\n\n",
  );
});
