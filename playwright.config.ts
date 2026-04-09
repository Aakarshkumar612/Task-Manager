import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  webServer: {
    command: 'cd backend && npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: 'list',
});
