import { useColorMode } from '@chakra-ui/react';

/**
 * Custom hook that provides color-mode aware colors
 * Use this throughout the app for consistent dark/light mode support
 */
export const useColors = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return {
    // Backgrounds
    bg: isDark ? '#0a1118' : 'white',
    bgAlt: isDark ? '#0f1a24' : 'surface.cream',
    bgCard: isDark ? '#152028' : 'white',
    bgCardHover: isDark ? '#1a2830' : 'gray.50',
    bgNavy: isDark ? '#1a2830' : 'navy.800',
    
    // Text colors
    textPrimary: isDark ? '#e8edf3' : 'navy.900',
    textSecondary: isDark ? '#9fb3c8' : 'navy.600',
    textMuted: isDark ? '#7b8794' : 'navy.500',
    textSubtle: isDark ? '#52606d' : 'navy.400',
    
    // Accent colors
    accent: 'accent.gold',
    accentHover: '#d4ac2b',
    
    // Border colors
    border: isDark ? '#3e4c5a' : 'navy.100',
    borderHover: isDark ? '#52606d' : 'navy.200',
    
    // Button colors
    btnPrimaryBg: isDark ? 'accent.gold' : 'navy.800',
    btnPrimaryColor: isDark ? 'navy.900' : 'white',
    btnPrimaryHoverBg: isDark ? '#d4ac2b' : 'navy.900',
    
    btnOutlineBorder: isDark ? '#9fb3c8' : 'navy.300',
    btnOutlineColor: isDark ? '#e8edf3' : 'navy.700',
    
    // Special
    navBg: isDark ? 'rgba(10, 17, 24, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    
    // Helper
    colorMode,
    isDark,
  };
};

export default useColors;

