export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
    "^.+\\.(t|j)s?$": "@swc/jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
