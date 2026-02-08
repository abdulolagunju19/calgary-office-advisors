import { extendTheme } from "@chakra-ui/react";

// Professional CRE Color Palette
// Inspired by high-end advisory firms - deep navy, warm neutrals, refined accents
const colors = {
  brand: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
  },
  navy: {
    50: '#f7f9fc',
    100: '#e3e8f0',
    200: '#c5cdd9',
    300: '#9aa5b1',
    400: '#7b8794',
    500: '#616e7c',
    600: '#52606d',
    700: '#3e4c5a',
    800: '#1f2933',
    900: '#0d1821',
  },
  accent: {
    gold: '#c9a227',
    copper: '#b87333',
    sage: '#6b8e6b',
    slate: '#4a5568',
  },
  surface: {
    light: '#fafafa',
    cream: '#f8f6f3',
    warm: '#f5f3f0',
  }
};

// Custom fonts - distinctive yet professional with warm character
const fonts = {
  heading: `'Lora', 'Playfair Display', Georgia, serif`,
  body: `'Source Sans 3', 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
  mono: `'JetBrains Mono', 'Fira Code', monospace`,
};

// Responsive breakpoints
const breakpoints = {
  sm: "30em",  // 480px
  md: "48em",  // 768px
  lg: "62em",  // 992px
  xl: "80em",  // 1280px
  "2xl": "96em", // 1536px
};

// Component style overrides
const components = {
  Button: {
    baseStyle: (props) => ({
      fontWeight: '500',
      borderRadius: '2px',
      letterSpacing: '0.02em',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'light' ? 'navy.800' : 'accent.gold',
        color: props.colorMode === 'light' ? 'white' : 'navy.900',
        _hover: {
          bg: props.colorMode === 'light' ? 'navy.900' : '#d4ac2b',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'light' ? 'navy.800' : '#9fb3c8',
        color: props.colorMode === 'light' ? 'navy.800' : '#e8edf3',
        borderWidth: '1.5px',
        _hover: {
          bg: props.colorMode === 'light' ? 'navy.800' : 'whiteAlpha.200',
          color: props.colorMode === 'light' ? 'white' : 'white',
        },
      }),
      ghost: (props) => ({
        color: props.colorMode === 'light' ? 'navy.700' : '#c5cdd9',
        _hover: {
          bg: props.colorMode === 'light' ? 'navy.50' : 'whiteAlpha.100',
        },
      }),
      cta: {
        bg: 'accent.gold',
        color: 'navy.900',
        fontWeight: '600',
        _hover: {
          bg: '#d4ac2b',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
    },
    sizes: {
      lg: {
        h: '56px',
        fontSize: 'md',
        px: '32px',
      },
      xl: {
        h: '64px',
        fontSize: 'lg',
        px: '40px',
      },
    },
  },
  Heading: {
    baseStyle: (props) => ({
      fontFamily: 'heading',
      fontWeight: '400',
      color: props.colorMode === 'light' ? 'navy.900' : '#e8edf3',
      letterSpacing: '-0.02em',
    }),
    sizes: {
      '4xl': {
        fontSize: ['3xl', '4xl', '5xl', '6xl'],
        lineHeight: '1.1',
      },
      '3xl': {
        fontSize: ['2xl', '3xl', '4xl'],
        lineHeight: '1.15',
      },
      '2xl': {
        fontSize: ['xl', '2xl', '3xl'],
        lineHeight: '1.2',
      },
    },
  },
  Text: {
    baseStyle: (props) => ({
      color: props.colorMode === 'light' ? 'navy.600' : '#9fb3c8',
      lineHeight: '1.7',
    }),
    variants: {
      lead: (props) => ({
        fontSize: ['lg', 'xl'],
        color: props.colorMode === 'light' ? 'navy.500' : '#b8c5d4',
        lineHeight: '1.8',
      }),
      caption: (props) => ({
        fontSize: 'sm',
        color: props.colorMode === 'light' ? 'navy.400' : '#7b8794',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: '500',
      }),
    },
  },
  Link: {
    baseStyle: (props) => ({
      color: props.colorMode === 'light' ? 'navy.700' : '#c5cdd9',
      transition: 'all 0.2s',
      _hover: {
        color: props.colorMode === 'light' ? 'navy.900' : 'white',
        textDecoration: 'none',
      },
    }),
  },
  Container: {
    baseStyle: {
      maxW: '1400px',
      px: { base: 4, md: 8, lg: 12 },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'white',
          borderColor: 'navy.200',
          borderWidth: '1px',
          _hover: {
            bg: 'white',
            borderColor: 'navy.300',
          },
          _focus: {
            bg: 'white',
            borderColor: 'navy.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
};

// Global styles
const styles = {
  global: (props) => ({
    'html, body': {
      bg: props.colorMode === 'light' ? 'white' : '#0a1118',
      color: props.colorMode === 'light' ? 'navy.800' : '#e8edf3',
      scrollBehavior: 'smooth',
    },
    '::selection': {
      bg: 'accent.gold',
      color: 'navy.900',
    },
    '::-moz-selection': {
      bg: 'accent.gold',
      color: 'navy.900',
    },
    '.fade-in': {
      animation: 'fadeIn 0.6s ease-out forwards',
    },
    '.slide-up': {
      animation: 'slideUp 0.6s ease-out forwards',
    },
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    '@keyframes slideUp': {
      from: { 
        opacity: 0, 
        transform: 'translateY(20px)' 
      },
      to: { 
        opacity: 1, 
        transform: 'translateY(0)' 
      },
    },
  }),
};

// Typography scale – slightly larger base for readability and dark mode
const fontSizes = {
  xs: "0.8125rem",
  sm: "0.9375rem",
  md: "1.0625rem",
  lg: "1.25rem",
  xl: "1.375rem",
  "2xl": "1.625rem",
  "3xl": "2rem",
  "4xl": "2.5rem",
  "5xl": "3.25rem",
  "6xl": "4rem",
  "7xl": "4.75rem",
  "8xl": "6rem",
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const lineHeights = {
  normal: "normal",
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 1.8,
};

const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

// Spacing scale
const space = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

// Shadow definitions
const shadows = {
  xs: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
  sm: "0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px 0 rgba(15, 23, 42, 0.06)",
  md: "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)",
  lg: "0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)",
  xl: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)",
  "2xl": "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(15, 23, 42, 0.06)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none",
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  space,
  shadows,
  breakpoints,
  components,
  styles,
});

export default customTheme;
