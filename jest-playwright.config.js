module.exports = {
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
        command: 'serve .',
        port: 5000
    }
};
