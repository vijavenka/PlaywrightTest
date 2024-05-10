const { defineConfig, devices, chromium  } = require('@playwright/test')

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
    expect: {
    timeout: 5000
  },
  reporter: [
    ['line'],
      ['html']
    ],
  use: {
    browserName : 'chromium',
    headless: false,
    screenshot: 'on',
    trace:  'on',
    viewport: {width:1519, height:730}
  }
};

module.exports = config;