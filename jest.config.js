module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './clientCoverage',
  testPathIgnorePatterns: [
    './server/test',
    './node_modules/'
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/Client/__test__/__mocks__/styleMock.js',
    '\\.(png|jpg|jpeg|gif|ttf|eot|svg)$': '<rootDir>/Client/jest/fileMock.js'
  }
};
