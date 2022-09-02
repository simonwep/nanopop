import {test} from '@playwright/test';
import {testPage} from './utils';

test.beforeEach( ({}, testInfo) => testInfo.snapshotSuffix = '');

test.describe('Custom Container', () => {

    // Test corners with default options
    const positions = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
        test(`It should properly work in a corner with position set to ${position}`, async ({page}) => {
            await testPage(page, `container.html#${position}`);
        });
    }
});
