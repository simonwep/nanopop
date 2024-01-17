import { test } from '@playwright/test';
import {positions, variants, testPage} from './utils';

test.beforeEach(({ }, testInfo) => testInfo.snapshotSuffix = '');

test.describe('Popper with arrow option', () => {

    // Test all possible combinations
    for (const position of positions) {
        for (const variant of variants) {
            const pos = `${position}-${variant}`;

            test(`Should position ${pos} with proper arrow placement`, async ({ page }) => {
                await testPage(page, `with-arrow-custom-position.html#${pos}`);
                await testPage(page, `with-arrow-large-popper.html#${pos}`);
                await testPage(page, `with-arrow-transformed-parent.html#${pos}`);
            });
        }
    }
});
