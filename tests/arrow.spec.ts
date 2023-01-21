import { test } from '@playwright/test';

const { testPage } = require('./utils');

test.beforeEach(({ }, testInfo) => testInfo.snapshotSuffix = '');

test.describe('Popper with arrow option', () => {

    // Test all possible combinations
    const positions = ['top', 'bottom', 'left', 'right'];
    const variants = ['start', 'middle', 'end'];

    for (const position of positions) {
        for (const variant of variants) {
            const pos = `${position}-${variant}`;

            test(`Should position ${pos} with proper arrow placement`, async ({ page }) => {
                await testPage(page, `with-arrow-custom-position.html#${pos}`);
                await testPage(page, `with-arrow-large-popper.html#${pos}`);
            });
        }
    }
});
