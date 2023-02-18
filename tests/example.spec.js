// example.spec.js
import { test, expect } from '@playwright/test'
import PlaywrightDevPage from './playwright-dev-page'
import fs from 'fs';
import axios from 'axios';


test.beforeEach(async ({ page, request }) => {
  await PlaywrightDevPage.initialize(page)
  await PlaywrightDevPage.goto();

});

test('test case 1 - C1', async ({ page }) => {
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

test('test case 2 - C2', async ({ page }) => {
  await PlaywrightDevPage.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});

test('test case 3 - C3', async ({ page }) => {
  expect(1+4).toBe(5);
});

test('test case 4 - C4', async ({ page }) => {
  expect("orhan".startsWith(o)).toBe(true);
});

test('test case 5 - C5', async ({ page }) => {
  console.log('helloworld!')
});



