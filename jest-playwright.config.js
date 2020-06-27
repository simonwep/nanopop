module.exports = {
    browsers: ['chromium', 'firefox', 'webkit'],
    launchOptions: {
        headless: true
    },
    contextOptions: {
        deviceScaleFactor: 1,
        viewport: {
            width: 750,
            height: 750
        }
    },
    serverOptions: {
        command: 'serve . -p 5000',
        port: 5000
    }
};
