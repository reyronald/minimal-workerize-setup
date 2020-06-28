module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(jest-test|jest-spec))\\.[jt]sx?$',
}
