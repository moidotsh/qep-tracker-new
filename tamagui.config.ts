import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { tokens } from '@tamagui/themes';

// Create font configurations
const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    dark: {
      background: '#121212',
      color: '#FFFFFF',
    },
  },
  tokens,
  shorthands,
  defaultTheme: 'dark',
});

// Type declarations
type AppConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;