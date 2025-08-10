/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.ts$',
};
// This configuration is for Jest to work with TypeScript in a Node.js environment.
// It specifies the preset, test environment, roots for test files, file extensions, and transformation rules.