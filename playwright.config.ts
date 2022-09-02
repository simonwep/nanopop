import type {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run serve',
        url: 'http://localhost:3000/',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:3000/tests/_pages/',
    }
};

export default config;
