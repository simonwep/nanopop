module.exports = {
    preset: 'jest-playwright-preset',
    coverageReporters: ['text'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 35000 // Most timeouts in playwright are set to 30s
};
