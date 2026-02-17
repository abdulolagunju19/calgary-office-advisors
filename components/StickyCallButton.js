import React from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import { FiPhone } from 'react-icons/fi';

const StickyCallButton = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <>
      {/* Mobile only - sticky call button */}
      <Box
        position="fixed"
        bottom={6}
        right={4}
        zIndex={999}
        display={{ base: 'block', md: 'none' }}
      >
        <Button
          as="a"
          href="tel:+15874320012"
          size="lg"
          bg={isDark ? 'accent.gold' : 'navy.900'}
          color={isDark ? 'navy.900' : 'white'}
          leftIcon={<FiPhone />}
          borderRadius="full"
          boxShadow="2xl"
          px={6}
          h="56px"
          fontSize="md"
          fontWeight="600"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: '2xl',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
        >
          Call Now
        </Button>
      </Box>
    </>
  );
};

export default StickyCallButton;
