import { test, expect } from '@playwright/test';

test('GH-21892', async ({ page }) => {
  // Arrange
  await page.setContent("<a download=\"SomeFile.txt\" href=\"data:text/plain;charset=utf8;,hello world\">Download!</a>");

  const downloadLink = page.getByRole("link").filter({ hasText: "Download!" });

  // Act
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadLink.click()
  ]);

  // Assert
  expect(download.suggestedFilename()).toBe("SomeFile.txt");
});