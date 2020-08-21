const {loadVisualTest} = require('./utils');

describe('All positions and default values', () => {

    it('Should work without any further options', async () => {
        await loadVisualTest('basic-auto.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should just middle if no variant is specified', async () => {
        await loadVisualTest('basic-without-variant.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should work with large poppers', async () => {
        await loadVisualTest('basic-large-popper.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should work with large poppers v2', async () => {
        await loadVisualTest('basic-large-popper-2.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should do nothing if there is no way of positioning it without clipping', async () => {
        await loadVisualTest('failing.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    // Test all possible combinations
    const positions = ['top', 'bottom', 'left', 'right'];
    const variants = ['start', 'middle', 'end'];

    for (const position of positions) {
        for (const variant of variants) {
            const posStr = `${position}-${variant}`;

            it(`It should properly position ${posStr}`, async () => {
                await loadVisualTest(`basic-custom-position.html#${posStr}`);
                expect(await page.screenshot()).toMatchImageSnapshot();
            });
        }
    }
});
