module.exports = {
    launch: {
        dumpio: true,
        headless: true,
        defaultViewport: null,
        args: [`--window-size=${750},${750}`]
    },
    server: {
        command: 'serve .',
        port: 5000
    }
};
