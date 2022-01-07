import { extendTheme } from '@chakra-ui/react';

const theme = {
  colors: {
    logoText: '#1A274A',
    primary: {
      50: '#ffedde',
      100: '#fecdb3',
      200: '#f9ad85',
      300: '#f58e56',
      400: '#f16d28',
      500: '#F0641A',
      600: '#a94009',
      700: '#792e05',
      800: '#4a1a00',
      900: '#1f0500',
    },
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
    inputGray: '#DADADA',
    text: '#52575C',
    orange: {
      50: '#ffedde',
      100: '#fecdb3',
      200: '#f9ad85',
      300: '#f58e56',
      400: '#f16d28',
      500: '#F0641A',
      600: '#a94009',
      700: '#792e05',
      800: '#4a1a00',
      900: '#1f0500',
    },
    background: '#F6F8FB',
  },
  fonts: {
    heading: 'Lato, sans-serif',
    body: 'Lato, sans-serif',
    mono: 'Lato, sans-serif',
  },
};

export default extendTheme(theme);
