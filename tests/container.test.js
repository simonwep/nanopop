describe('Custom Container', () => {

    // Test corners with default options
    const positions = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
        it(`It should properly work in a corner with position set to ${position}`, async () => {
            await page.goto(`${URL_BASE}/container.html#${position}`);
            expect(await page.screenshot()).toMatchImageSnapshot();
        });
    }
});
