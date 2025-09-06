module.exports = {
  preset: 'react-native',
  setupFiles: [
    './__mocks__/react-native-gesture-handler.js',
    './__mocks__/@react-native-async-storage/async-storage.js',
    './__mocks__/@react-native-community/geolocation.js',
  ],
  transform: {
    '^\\\\.+\\.(js|jsx|ts|tsx)
: 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
