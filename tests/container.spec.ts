import {test} from '@playwright/test';
import {positions, testPage} from './utils';

test.beforeEach( ({}, testInfo) => testInfo.snapshotSuffix = '');

test.describe('Custom Container', () => {

    // Test corners with default options
    for (const position of positions) {
        test(`It should properly work in a corner with position set to ${position}`, async ({page}) => {
            await testPage(page, `container.html#${position}`);
        });
    }
});
