describe('All positions and default values', () => {

    it('Should work without any further options', async () => {
        await page.goto(`${URL_BASE}/basic-auto.html`);
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    it('Should just middle if no variant is specified', async () => {
        await page.goto(`${URL_BASE}/basic-without-variant.html`);
        expect(await page.screenshot()).toMatchImageSnapshot();
    });

    // Test all possible combinations
    const positions = ['top', 'bottom', 'left', 'right'];
    const variants = ['start', 'middle', 'end'];

    for (const position of positions) {
        for (const variant of variants) {
            const posStr = `${position}-${variant}`;

            it(`It should properly position ${posStr}`, async () => {
                await page.goto(`${URL_BASE}/basic-custom-position.html#${posStr}`);
                expect(await page.screenshot()).toMatchImageSnapshot();
            });
        }
    }
});
