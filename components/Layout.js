import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import Navigation from './Navigation';
import FooterNew from './FooterNew';

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: 'white',
    dark: 'navy.900'
  };

  return (
    <Box 
      minH="100vh" 
      bg={bgColor[colorMode]}
      display="flex"
      flexDirection="column"
    >
      <Navigation />
      <Box as="main" flex="1">
        {children}
      </Box>
      <FooterNew />
    </Box>
  );
};

export default Layout;

