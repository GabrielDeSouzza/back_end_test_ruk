module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
