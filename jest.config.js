module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
