import {test} from '@playwright/test';
import {positions, variants, testPage} from './utils';

test.beforeEach( ({}, testInfo) => testInfo.snapshotSuffix = '');

test.describe('All positions and default values', () => {

    test('Should work without any further options', async ({page}) => {
        await testPage(page, 'basic-auto.html');
    });

    test('Should just middle if no variant is specified', async ({page}) => {
        await testPage(page, 'basic-without-variant.html');
    });

    test('Should work with large poppers', async ({page}) => {
        await testPage(page, 'basic-large-popper.html');
    });

    test('Should work with large poppers 2', async ({page}) => {
        await testPage(page, 'basic-large-popper-2.html');
    });

    test('Should work with padding', async ({page}) => {
        await testPage(page, 'basic-padding.html');
    });

    test('Should do nothing if there is no way of positioning it without clipping', async ({page}) => {
        await testPage(page, 'failing.html');
    });

    // Test all possible combinations
    for (const position of positions) {
        for (const variant of variants) {
            const pos = `${position}-${variant}`;

            test(`It should properly position ${pos}`, async ({page}) => {
                await testPage(page, `basic-custom-position.html#${pos}`);
            });
        }
    }
});
