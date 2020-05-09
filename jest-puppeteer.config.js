const CI = process.env.CI === 'true';

module.exports = {
    browser: 'chromium',
    launch: {
        dumpio: true,
        headless: true,
        defaultViewport: null,
        executablePath: CI ? '/usr/bin/chromium-browser' : undefined,
        args: [`--window-size=${750},${750}`]
    },
    server: {
        command: 'serve .',
        port: 5000
    }
};
