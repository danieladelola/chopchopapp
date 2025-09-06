const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName.startsWith('react-native-maps')) {
    return context.resolveRequest(context, path.resolve(__dirname, './src/mocks/react-native-maps.web.js'), platform);
  }
  // Fallback to the default resolver
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
