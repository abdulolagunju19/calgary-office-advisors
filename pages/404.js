import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import Layout from '../components/Layout';

export default function Custom404() {
  const { colorMode } = useColorMode();
  const isLight = colorMode === 'light';
  return (
    <>
      <Head>
        <title>Page not found | Calgary Office Advisors</title>
      </Head>
      <Layout>
        <Box
          minH="80vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pt={{ base: 20, lg: 0 }}
        >
          <Container maxW="600px" px={{ base: 4, md: 8 }}>
            <Box textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '6xl', md: '8xl' }}
                color={isLight ? 'navy.300' : 'whiteAlpha.300'}
                fontWeight="400"
                mb={4}
              >
                404
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontFamily="heading"
                fontWeight="400"
                color={isLight ? 'navy.800' : '#e8edf3'}
                mb={4}
              >
                Page not found
              </Heading>
              <Text
                fontSize="lg"
                color={isLight ? 'navy.500' : 'whiteAlpha.700'}
                mb={8}
                lineHeight="1.8"
              >
                This page doesn't exist or has been moved.
              </Text>
              <VStack spacing={4}>
                <NextLink href="/" passHref legacyBehavior>
                  <Button
                    as="a"
                    size="lg"
                    variant="outline"
                    borderColor={isLight ? 'navy.800' : 'whiteAlpha.400'}
                    color={isLight ? 'navy.800' : '#e8edf3'}
                    px={8}
                    h="56px"
                    fontSize="sm"
                    fontWeight="500"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    leftIcon={<FiHome />}
                    _hover={{ bg: isLight ? 'navy.50' : 'whiteAlpha.100' }}
                  >
                    Home
                  </Button>
                </NextLink>
                <NextLink href="/insights" passHref legacyBehavior>
                  <Link
                    fontSize="sm"
                    color={isLight ? 'navy.600' : 'whiteAlpha.800'}
                    fontWeight="500"
                  >
                    Insights →
                  </Link>
                </NextLink>
                <Button
                  variant="ghost"
                  color={isLight ? 'navy.600' : 'whiteAlpha.700'}
                  size="sm"
                  leftIcon={<FiArrowLeft />}
                  onClick={() => window.history.back()}
                  _hover={{ color: isLight ? 'navy.800' : 'white' }}
                >
                  Go back
                </Button>
              </VStack>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
