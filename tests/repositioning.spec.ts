import {test} from '@playwright/test';
import {testPage} from './utils';

test.beforeEach( ({}, testInfo) => testInfo.snapshotSuffix = '');

test.describe('Repositioning', () => {

    test('Should reposition the element to prevent left-clipping', async ({page}) => {
        await testPage(page, 'repositioning-automatic.html');
    });

    test('Should allow a customized position order', async ({page}) => {
        await testPage(page, 'repositioning-custom-position-order.html');
    });

    test('Should allow a customized variant order', async ({page}) => {
        await testPage(page, 'repositioning-custom-variant-order.html');
    });

    // Test corners with default options
    const positions = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
        test(`It should properly work in a corner with position set to ${position}`, async ({page}) => {
            await testPage(page, `repositioning-edge-cases.html#${position}`);
        });
    }
});
