module.exports = {
    preset: 'jest-puppeteer',
    coverageReporters: ['text'],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 20000
};
