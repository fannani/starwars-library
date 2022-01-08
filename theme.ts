import { extendTheme } from '@chakra-ui/react';

const theme = {
  colors: {
    grey: {
      50: '#f1f1fc',
      100: '#d3dadd',
      200: '#bbbfc3',
      300: '#a2a6aa',
      400: '#888c90',
      500: '#6f7377',
      600: '#55595d',
      700: '#3c4044',
      800: '#23262b',
      900: '#001010',
    },
    neutral: '#E8E8E8',
    text: '#52575C',
    background: '#F6F8FB',
  },
  fonts: {
    heading: 'Lato, sans-serif',
    body: 'Lato, sans-serif',
    mono: 'Lato, sans-serif',
  },
};

export default extendTheme(theme);
