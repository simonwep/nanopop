const {loadVisualTest} = require('./utils');

describe('Repositioning', () => {

    it('Should reposition the element to prevent left-clipping', async () => {
        await loadVisualTest('repositioning-automatic.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should allow a customized position order', async () => {
        await loadVisualTest('repositioning-custom-position-order.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should allow a customized variant order', async () => {
        await loadVisualTest('repositioning-custom-variant-order.html');
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    // Test corners with default options
    const positions = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
        it(`It should properly work in a corner with position set to ${position}`, async () => {
            await loadVisualTest(`repositioning-edge-cases.html#${position}`);
            expect(await page.screenshot()).toMatchImageSnapshot();
        });
    }
});
