const { getDefaultConfig } = require('expo/metro-config');

const { mergeConfig } = require('@react-native/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const expoConfig = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

/** @type {import('metro-config').MetroConfig} */
const config = {
  transformer: {
    getTransformOptions: async () => ({ transform: { inlineRequires: true } }),
  },
};

module.exports = mergeConfig(expoConfig, config);
