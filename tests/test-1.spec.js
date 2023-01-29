import { test, expect } from '@playwright/test';

  test('test', async ({ page }) => {
    await page.goto('https://www.google.com/');
   
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('Orhan');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await expect(page.getByRole('link', { name: 'Orhan - Wikipedia https://en.wikipedia.org › wiki › Orhan' })).toBeVisible()
    await page.getByRole('link', { name: 'Orhan - Wikipedia https://en.wikipedia.org › wiki › Orhan' }).click();
    await page.getByRole('heading', { name: 'Orhan' }).getByText('Orhan').click({
      button: 'right'
    });
    await page.goto('https://en.wikipedia.org/wiki/Orhan');
  
  });
