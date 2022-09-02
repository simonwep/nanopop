import {expect, Page} from '@playwright/test';

export const testPage = async (page: Page, name: string) => {

    // Load page
    await page.goto(name, {
        waitUntil: 'networkidle'
    });

    // Wait until the next frame which should show the by nanopop update elements
    await page.evaluate(() => new Promise(requestAnimationFrame));

    // Test
    expect(await page.screenshot()).toMatchSnapshot(`${name}.png`);
};
