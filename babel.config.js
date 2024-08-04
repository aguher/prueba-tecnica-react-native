module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/ui/components',
          '@screens': './src/ui/screens',
          '@core': './src/core/*',
          '@testUtils': './__tests__/utils',
        },
      },
    ],
  ],
};
