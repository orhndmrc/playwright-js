// example.spec.js
import {test, expect} from '@playwright/test'
import { request } from 'http';
import PlaywrightDevPage from './playwright-dev-page'

test.describe('Suite', () => {

  test.beforeEach(async ({ page, request }) => {
    await PlaywrightDevPage.initialize(page)
    await PlaywrightDevPage.goto();

  });
  
  test('getting started should contain table of contents', async ({ page }) => {
    await PlaywrightDevPage.getStarted();
    await expect(PlaywrightDevPage.tocList).toHaveText([
      `How to install Playwright`,
      `What's Installed`,
      `How to run the example test`,
      `How to open the HTML test report`,
      `Write tests using web first assertions, page fixtures and locators`,
      `Run single test, multiple tests, headed mode`,
      `Generate tests with Codegen`,
      `See a trace of your tests`
    ]);
  });

  test('should show Page Object Model article', async ({ page }) => {
    await PlaywrightDevPage.pageObjectModel();
    await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
  });

});

