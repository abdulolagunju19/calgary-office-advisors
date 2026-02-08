import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Link,
  Button,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

const FooterLink = ({ href, children, isExternal = false, colorMode }) => (
  <NextLink href={href} passHref legacyBehavior>
    <Link
      fontSize="md"
      color={colorMode === 'light' ? 'navy.500' : '#9fb3c8'}
      transition="all 0.2s"
      _hover={{ color: colorMode === 'light' ? 'navy.800' : '#e8edf3' }}
      isExternal={isExternal}
    >
      {children}
    </Link>
  </NextLink>
);

const FooterNew = () => {
  const { colorMode } = useColorMode();
  const currentYear = new Date().getFullYear();

  const bgColor = {
    light: 'white',
    dark: 'navy.900',
  };

  const textPrimary = colorMode === 'light' ? 'navy.900' : '#e8edf3';
  const textSecondary = colorMode === 'light' ? 'navy.500' : '#9fb3c8';
  const textMuted = colorMode === 'light' ? 'navy.400' : '#7b8794';
  const borderColor = colorMode === 'light' ? 'navy.200' : '#3e4c5a';

  return (
    <Box
      as="footer"
      bg={bgColor[colorMode]}
      pt={{ base: 12, md: 20 }}
      pb={{ base: 10, md: 12 }}
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={{ base: 10, md: 12 }}
          pb={12}
        >
          <VStack align="flex-start" spacing={5}>
            <Text
              fontFamily="heading"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="400"
              color={textPrimary}
              letterSpacing="-0.02em"
            >
              Calgary Office Advisors
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color={textSecondary} maxW="400px" lineHeight="1.6">
              A reference and education platform for commercial real estate in Calgary. Insights, buildings, coworking, and professional references.
            </Text>
            <VStack align="flex-start" spacing={3}>
              <FooterLink href="/" colorMode={colorMode}>Home</FooterLink>
              <FooterLink href="/insights" colorMode={colorMode}>Companies</FooterLink>
              <FooterLink href="/buildings" colorMode={colorMode}>Buildings</FooterLink>
              <FooterLink href="/coworking" colorMode={colorMode}>Coworking</FooterLink>
              <FooterLink href="/references" colorMode={colorMode}>References</FooterLink>
            </VStack>
          </VStack>

          <VStack align={{ base: 'flex-start', md: 'flex-end' }} spacing={5}>
            <Text fontSize="sm" fontWeight="600" color={textMuted} letterSpacing="0.1em" textTransform="uppercase">
              Stay updated
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color={textSecondary} maxW="340px" textAlign={{ base: 'left', md: 'right' }} lineHeight="1.6">
              Market insights and Calgary office leasing updates.
            </Text>
            <Link
              href="https://preview.mailerlite.io/forms/1951668/175148894369350926/share"
              isExternal
              w={{ base: '100%', md: 'auto' }}
            >
              <Button
                size="md"
                variant="outline"
                borderColor={borderColor}
                color={textPrimary}
                fontSize="md"
                fontWeight="500"
                rightIcon={<FiArrowUpRight />}
                _hover={{ bg: colorMode === 'light' ? 'navy.50' : 'whiteAlpha.100' }}
              >
                Subscribe
              </Button>
            </Link>
          </VStack>
        </Flex>

        <Divider borderColor={borderColor} />

        <Flex
          pt={8}
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={4}
        >
          <Text fontSize="md" color={textMuted}>
            © {currentYear} Calgary Office Advisors.
          </Text>
          <Text fontSize="md" color={textMuted} fontStyle="italic">
            Maintained by a Calgary commercial real estate professional.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default FooterNew;
