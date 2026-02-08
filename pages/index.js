import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Link,
  Button,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import useColors from '../hooks/useColors';

const valueCards = [
  {
    href: '/insights',
    stat: 'Companies',
    label: 'Calgary business directory and map, plus articles and commentary on leasing and office trends.',
  },
  {
    href: '/buildings',
    stat: 'Buildings',
    label: 'Structured directory of Calgary office buildings. Reference only.',
  },
  {
    href: '/coworking',
    stat: 'Coworking',
    label: 'Curated list of coworking spaces with locations and descriptions.',
  },
  {
    href: '/references',
    stat: 'References',
    label: 'Designers, law firms, and professionals in the lease process.',
  },
];

export default function Home() {
  const router = useRouter();
  const [businessUrl, setBusinessUrl] = useState('');
  const { colorMode } = useColorMode();
  const colors = useColors();

  const handleBusinessUrlSubmit = (e) => {
    e.preventDefault();
    const trimmed = businessUrl.trim();
    if (trimmed) {
      router.push({ pathname: '/contact', query: { website: trimmed } });
    }
  };

  const siteUrl = 'https://calgary-office-advisors.vercel.app';
  const title = 'Calgary Office Advisors | Reference & Education';
  const description = 'A trusted reference and education platform for commercial real estate in Calgary. Insights, building directory, coworking, and professional references for the leasing process.';

  const accent = colorMode === 'light' ? 'accent.gold' : '#c9a227';
  const isDark = colorMode === 'dark';
  const cardsBg = isDark ? '#152028' : 'navy.50';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={siteUrl}
        openGraph={{ url: siteUrl, title, description }}
      />
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout>
        {/* Announcement bar – same tone as nav, accent dot */}
        <Box
          bg={colorMode === 'light' ? 'navy.800' : 'navy.900'}
          color="white"
          py={2}
          px={4}
          textAlign="center"
          fontSize={{ base: 'md', md: 'lg' }}
          borderBottom="1px solid"
          borderColor="whiteAlpha.100"
        >
          <NextLink href="/insights" passHref legacyBehavior>
            <Link
              color="white"
              _hover={{ color: 'whiteAlpha.95', textDecoration: 'underline' }}
              display="inline-flex"
              alignItems="center"
              gap={2}
            >
              <Box as="span" w="8px" h="8px" borderRadius="full" bg={accent} flexShrink={0} />
              New: Building directory and leasing guides now live. Explore companies →
            </Link>
          </NextLink>
        </Box>

        {/* Hero – full-bleed yycdowntown image with dark overlay */}
        <Box
          position="relative"
          pt={{ base: 10, md: 14 }}
          pb={{ base: 12, md: 16 }}
          overflow="hidden"
          minH={{ base: '520px', md: '560px' }}
          bg="navy.900"
          backgroundImage="url('/yycdowntown.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          {/* Dark overlay for text readability */}
          <Box
            position="absolute"
            inset={0}
            bg="black"
            opacity={0.6}
            pointerEvents="none"
          />
          <Box position="relative" zIndex={1}>
            <Container maxW="1200px" px={{ base: 4, md: 6, lg: 8 }}>
              <VStack align="flex-start" spacing={6} maxW="880px">
                <Box
                  px={4}
                  py={2.5}
                  bg="whiteAlpha.15"
                  border="1px solid"
                  borderColor="whiteAlpha.25"
                  borderRadius="md"
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="500"
                  color="white"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  For Calgary business owners and operators
                </Box>
                <Heading
                  as="h1"
                  fontSize={{ base: '2.75rem', md: '3.5rem', lg: '4rem' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color="white"
                  lineHeight="1.12"
                  letterSpacing="-0.025em"
                >
                  The reference library for commercial real estate in Calgary.
                </Heading>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="white"
                  lineHeight="1.65"
                  maxW="720px"
                >
                  Companies, building directory, and trusted references—so you can understand leasing and navigate the process with confidence.
                </Text>

                {/* Primary CTA: add your business for inbound */}
                <Box as="form" onSubmit={handleBusinessUrlSubmit} w="100%" maxW="800px" pt={6} pb={2}>
                  <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="600"
                    color="white"
                    mb={4}
                    lineHeight="1.3"
                    letterSpacing="-0.02em"
                  >
                    Share your business website to get access to the Calgary business directory
                  </Text>
                  <HStack align="stretch" spacing={3} flexDirection={{ base: 'column', sm: 'row' }}>
                    <Input
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={businessUrl}
                      onChange={(e) => setBusinessUrl(e.target.value)}
                      bg="white"
                      border="2px solid"
                      borderColor="whiteAlpha.4"
                      color="navy.900"
                      fontSize={{ base: 'md', md: 'lg' }}
                      h={{ base: '56px', md: '60px' }}
                      flex={1}
                      _placeholder={{ color: 'navy.400' }}
                      _hover={{ borderColor: 'whiteAlpha.6' }}
                      _focus={{
                        borderColor: 'white',
                        boxShadow: '0 0 0 2px rgba(255,255,255,0.5)',
                      }}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      bg="white"
                      color="navy.900"
                      fontWeight="600"
                      rightIcon={<FiArrowRight />}
                      h={{ base: '56px', md: '60px' }}
                      px={8}
                      fontSize={{ base: 'md', md: 'lg' }}
                      _hover={{ bg: 'whiteAlpha.95', transform: 'translateY(-1px)', boxShadow: 'lg' }}
                      flexShrink={0}
                      transition="all 0.2s"
                    >
                      Get access
                    </Button>
                  </HStack>
                </Box>

                <Text fontSize="md" color="white" pt={2} pb={3}>
                  Or explore the site
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  <NextLink href="/insights" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="lg"
                      variant="outline"
                      borderColor="whiteAlpha.5"
                      borderWidth="2px"
                      color="white"
                      px={8}
                      h="52px"
                      fontSize="md"
                      fontWeight="500"
                      _hover={{
                        bg: 'whiteAlpha.12',
                        borderColor: 'whiteAlpha.6',
                        color: 'white',
                      }}
                    >
                      Explore companies
                    </Button>
                  </NextLink>
                  <NextLink href="/buildings" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="lg"
                      variant="outline"
                      borderColor="whiteAlpha.5"
                      borderWidth="2px"
                      color="white"
                      px={8}
                      h="52px"
                      fontSize="md"
                      fontWeight="500"
                      _hover={{
                        bg: 'whiteAlpha.12',
                        borderColor: 'whiteAlpha.6',
                        color: 'white',
                      }}
                    >
                      Browse building directory →
                    </Button>
                  </NextLink>
                </HStack>
              </VStack>
            </Container>
          </Box>
        </Box>

        {/* Value cards – light and dark mode */}
        <Box bg={cardsBg} py={{ base: 10, md: 12 }} px={{ base: 0, md: 0 }}>
          <Container maxW="1100px" px={{ base: 4, md: 6, lg: 8 }}>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="600"
              color={isDark ? 'white' : 'navy.600'}
              letterSpacing="0.12em"
              textTransform="uppercase"
              mb={6}
            >
              Where to start
            </Text>
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={5}
            >
              {valueCards.map((card) => (
                <NextLink key={card.href} href={card.href} passHref legacyBehavior>
                  <Link
                    display="block"
                    p={{ base: 5, md: 6 }}
                    bg={isDark ? 'whiteAlpha.12' : 'white'}
                    border="1px solid"
                    borderColor={isDark ? 'whiteAlpha.22' : 'navy.200'}
                    borderRadius="lg"
                    transition="all 0.25s"
                    _hover={{
                      bg: isDark ? 'whiteAlpha.18' : 'navy.50',
                      borderColor: isDark ? 'whiteAlpha.35' : 'navy.300',
                      textDecoration: 'none',
                      transform: 'translateY(-2px)',
                    }}
                  >
                    <Text
                      fontSize={{ base: 'xl', md: '2xl' }}
                      fontWeight="600"
                      color={isDark ? 'white' : 'navy.900'}
                      mb={4}
                      letterSpacing="-0.02em"
                    >
                      {card.stat}
                    </Text>
                    <Text fontSize={{ base: 'md', md: 'lg' }} color={isDark ? 'white' : 'navy.600'} lineHeight="1.6">
                      {card.label}
                    </Text>
                  </Link>
                </NextLink>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Credibility strip – warm light so it doesn’t clash */}
        <Box
          bg={colorMode === 'light' ? 'navy.50' : 'navy.800'}
          py={{ base: 10, md: 12 }}
          borderTop="1px solid"
          borderColor={colorMode === 'light' ? 'navy.100' : 'whiteAlpha.08'}
        >
          <Container maxW="720px" px={{ base: 4, md: 6, lg: 8 }}>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="600"
              color={colorMode === 'light' ? 'navy.500' : 'white'}
              letterSpacing="0.12em"
              textTransform="uppercase"
              textAlign="center"
              mb={4}
            >
              Trusted reference for the leasing process
            </Text>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={colorMode === 'light' ? 'navy.600' : 'white'}
              textAlign="center"
              lineHeight="1.7"
            >
              Calgary Office Advisors is a knowledge hub for business owners navigating commercial real estate—bookmark it and return whenever you need clarity on costs, lease types, or next steps.
            </Text>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
