module.exports = {
    preset: 'jest-playwright-preset',
    coverageReporters: ['text'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 20000
};
