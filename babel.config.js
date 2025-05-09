module.exports = function(api) {
    api.cache(true);
    
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // This env variable transform needs to be first
        [
          'transform-inline-environment-variables',
          {
            include: 'TAMAGUI_TARGET',
          },
        ],
        // Then the Tamagui plugin
        [
          '@tamagui/babel-plugin',
          {
            components: ['tamagui'],
            config: './tamagui.config.ts',
            logTimings: true,
            disableExtraction: process.env.NODE_ENV === 'development',
          },
        ],
      ],
    };
  };