module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-native-community|@react-native-async-storage)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
