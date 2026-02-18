import Head from 'next/head';
import NextLink from 'next/link';
import { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Flex,
  Link,
  Icon,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  Select,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { 
  FiArrowRight, 
  FiArrowUpRight,
  FiBox,
  FiBarChart2,
  FiMap,
  FiLayers,
  FiUsers,
  FiGrid,
  FiFileText,
  FiDatabase,
} from 'react-icons/fi';

import Layout from '../components/Layout';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import useColors from '../hooks/useColors';

const MotionBox = motion(Box);

// Space Calculator Component
const SpaceCalculator = ({ colors }) => {
  const [headcount, setHeadcount] = useState(50);
  const [workStyle, setWorkStyle] = useState('hybrid');
  const [deskingRatio, setDeskingRatio] = useState(0.7);

  // Space per person based on work style
  const spacePerPerson = {
    traditional: 175,
    hybrid: 150,
    agile: 125,
  };

  const effectiveHeadcount = Math.ceil(headcount * deskingRatio);
  const usableSquareFeet = effectiveHeadcount * spacePerPerson[workStyle];
  const rentableSquareFeet = Math.ceil(usableSquareFeet * 1.15); // 15% loss factor

  return (
    <Box
      bg={colors.bgCard}
      p={{ base: 6, md: 10 }}
      border="1px solid"
      borderColor={colors.border}
    >
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading
            as="h3"
            fontSize="xl"
            fontFamily="heading"
            fontWeight="400"
            color={colors.textPrimary}
            mb={2}
          >
            Office Space Calculator
          </Heading>
          <Text fontSize="sm" color={colors.textMuted}>
            Estimate your space requirements based on headcount and work style.
          </Text>
        </Box>

        {/* Headcount Slider */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
            Total Headcount: {headcount}
          </FormLabel>
          <Slider
            value={headcount}
            onChange={setHeadcount}
            min={10}
            max={500}
            step={5}
          >
            <SliderTrack bg={colors.border}>
              <SliderFilledTrack bg={colors.isDark ? 'accent.gold' : 'navy.800'} />
            </SliderTrack>
            <SliderThumb boxSize={5} bg={colors.isDark ? 'accent.gold' : 'navy.800'} />
          </Slider>
          <HStack justify="space-between" mt={1}>
            <Text fontSize="xs" color={colors.textSubtle}>10</Text>
            <Text fontSize="xs" color={colors.textSubtle}>500</Text>
          </HStack>
        </FormControl>

        {/* Work Style Select */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
            Work Style
          </FormLabel>
          <Select
            value={workStyle}
            onChange={(e) => setWorkStyle(e.target.value)}
            bg={colors.bg}
            borderColor={colors.border}
            color={colors.textPrimary}
          >
            <option value="traditional">Traditional (175 SF/person)</option>
            <option value="hybrid">Hybrid (150 SF/person)</option>
            <option value="agile">Agile/Hoteling (125 SF/person)</option>
          </Select>
        </FormControl>

        {/* Desking Ratio Slider */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
            Desking Ratio: {Math.round(deskingRatio * 100)}%
          </FormLabel>
          <Slider
            value={deskingRatio}
            onChange={setDeskingRatio}
            min={0.5}
            max={1}
            step={0.05}
          >
            <SliderTrack bg={colors.border}>
              <SliderFilledTrack bg="accent.gold" />
            </SliderTrack>
            <SliderThumb boxSize={5} bg="accent.gold" />
          </Slider>
          <Text fontSize="xs" color={colors.textSubtle} mt={1}>
            Ratio of desks to employees (lower for hot-desking)
          </Text>
        </FormControl>

        {/* Results */}
        <Box pt={6} borderTop="1px solid" borderColor={colors.border}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box>
              <Text fontSize="xs" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.1em">
                Usable SF
              </Text>
              <Text fontFamily="heading" fontSize="3xl" color={colors.textPrimary}>
                {usableSquareFeet.toLocaleString()}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.1em">
                Rentable SF
              </Text>
              <Text fontFamily="heading" fontSize="3xl" color="accent.gold">
                {rentableSquareFeet.toLocaleString()}
              </Text>
            </Box>
          </Grid>
          <Text fontSize="xs" color={colors.textSubtle} mt={4}>
            * Assumes 15% loss factor. Actual requirements may vary based on building efficiency.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

// Tech Features
const techFeatures = [
  {
    icon: FiBox,
    title: '3D Visualization',
    description: 'Interactive 3D models for space planning, conversion analysis, and client presentations.',
  },
  {
    icon: FiBarChart2,
    title: 'Market Intelligence',
    description: 'Real-time market data, comp analysis, and trend tracking for informed decisions.',
  },
  {
    icon: FiMap,
    title: 'Location Analytics',
    description: 'GIS-powered site selection with demographic, labor, and accessibility overlays.',
  },
  {
    icon: FiLayers,
    title: 'Portfolio Dashboards',
    description: 'Centralized views of lease obligations, critical dates, and portfolio performance.',
  },
];

export default function Technology() {
  const colors = useColors();

  const url = 'https://abdulolagunju.com/technology';
  const title = 'Technology | Abdul-Samad Olagunju';
  const description = 'Technology-forward commercial real estate advisory. 3D visualizations, market intelligence, and custom analytics tools.';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ url, title, description }}
      />
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <Box pt={{ base: 32, lg: 40 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
            <Grid
              templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
              gap={{ base: 10, lg: 20 }}
              alignItems="center"
            >
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="accent.gold"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    mb={4}
                  >
                    Technology
                  </Text>
                  <Heading
                    as="h1"
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    lineHeight="1.1"
                    letterSpacing="-0.02em"
                    mb={6}
                  >
                    Intelligence-Driven
                    <br />
                    Real Estate
                  </Heading>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={colors.textMuted}
                    lineHeight="1.8"
                    maxW="500px"
                  >
                    Real-time visualizations and data tools to improve portfolio-wide 
                    decisions. Technology isn't just a tool—it's a competitive advantage 
                    in commercial real estate.
                  </Text>
                </MotionBox>
              </GridItem>
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Box
                    bg="navy.800"
                    p={{ base: 4, md: 6 }}
                  >
                    <Box bg="navy.700" p={4}>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        {techFeatures.slice(0, 4).map((feature) => (
                          <VStack
                            key={feature.title}
                            align="flex-start"
                            p={4}
                            bg="whiteAlpha.50"
                            spacing={2}
                          >
                            <Icon as={feature.icon} color="accent.gold" boxSize={5} />
                            <Text fontSize="sm" color="white" fontWeight="500">
                              {feature.title}
                            </Text>
                          </VStack>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>
          </Container>
        </Box>

        {/* Featured Project - TerraTrail */}
        <Section bg={colors.bgAlt}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 16 }}
            alignItems="center"
          >
            <GridItem order={{ base: 2, lg: 1 }}>
              <Link
                href="https://terratrail.vercel.app/"
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  bg={colors.isDark ? 'accent.gold' : 'navy.800'}
                  p={{ base: 8, md: 12 }}
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s"
                  role="group"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '2xl',
                    bg: colors.isDark ? '#d4ac2b' : 'navy.900',
                  }}
                >
                  <VStack spacing={6} align="center" textAlign="center">
                    <Box 
                      p={4} 
                      bg={colors.isDark ? 'navy.800' : 'whiteAlpha.100'} 
                      borderRadius="full"
                    >
                      <Icon 
                        as={FiBox} 
                        boxSize={10} 
                        color={colors.isDark ? 'white' : 'accent.gold'} 
                      />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize="2xl"
                      fontFamily="heading"
                      fontWeight="400"
                      color={colors.isDark ? 'navy.900' : 'white'}
                    >
                      View TerraTrail
                    </Heading>
                    <Text
                      fontSize="md"
                      color={colors.isDark ? 'navy.700' : 'whiteAlpha.800'}
                      lineHeight="1.7"
                      maxW="300px"
                    >
                      Interactive 3D visualization platform for exploring office-to-residential conversion potential.
                    </Text>
                    <HStack
                      spacing={2}
                      color={colors.isDark ? 'white' : 'navy.900'}
                      fontSize="sm"
                      fontWeight="600"
                      letterSpacing="0.05em"
                      textTransform="uppercase"
                      bg={colors.isDark ? 'navy.800' : 'accent.gold'}
                      px={5}
                      py={3}
                      transition="all 0.2s"
                      _groupHover={{ 
                        bg: colors.isDark ? 'navy.900' : '#d4ac2b' 
                      }}
                    >
                      <Text>Launch Platform</Text>
                      <FiArrowUpRight />
                    </HStack>
                  </VStack>
                  {/* Decorative Element */}
                  <Box
                    position="absolute"
                    top="-40px"
                    right="-40px"
                    w="150px"
                    h="150px"
                    border="2px solid"
                    borderColor={colors.isDark ? 'navy.600' : 'whiteAlpha.100'}
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    bottom="-60px"
                    left="-60px"
                    w="200px"
                    h="200px"
                    border="2px solid"
                    borderColor={colors.isDark ? 'navy.700' : 'whiteAlpha.050'}
                    borderRadius="full"
                  />
                </Box>
              </Link>
            </GridItem>
            <GridItem order={{ base: 1, lg: 2 }}>
              <VStack align="flex-start" spacing={6}>
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="accent.gold"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                    mb={3}
                  >
                    Featured Project
                  </Text>
                  <Heading
                    as="h2"
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    mb={4}
                  >
                    TerraTrail
                  </Heading>
                  <Text
                    fontSize="lg"
                    fontFamily="heading"
                    color={colors.textSecondary}
                    mb={4}
                  >
                    3D Visualization for Office-to-Residential Conversions
                  </Text>
                </Box>
                <Text fontSize="md" color={colors.textMuted} lineHeight="1.8">
                  An interactive platform for visualizing office building conversions 
                  to residential use.
                </Text>
                <Link
                  href="https://terratrail.vercel.app/"
                  isExternal
                >
                  <Button
                    bg={colors.btnPrimaryBg}
                    color={colors.btnPrimaryColor}
                    px={8}
                    h="56px"
                    fontSize="sm"
                    fontWeight="500"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    rightIcon={<FiArrowUpRight />}
                    _hover={{
                      bg: colors.btnPrimaryHoverBg,
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    Explore TerraTrail
                  </Button>
                </Link>
              </VStack>
            </GridItem>
          </Grid>
        </Section>

        {/* Client Tools Section */}
        <Section>
          <SectionHeading
            label="Client Tools"
            title="Exclusive Access To Tools"
            description="Proprietary tools developed to give clients a competitive edge in their real estate decisions."
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {/* Lease Abstract Generator */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box
                p={{ base: 8, md: 10 }}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                h="100%"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  borderColor: 'accent.gold',
                }}
              >
                <VStack align="flex-start" spacing={5}>
                  <Box p={4} bg={colors.isDark ? '#1a2830' : 'surface.cream'}>
                    <Icon as={FiFileText} boxSize={7} color="accent.gold" />
                  </Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                  >
                    Lease Abstract Generator
                  </Heading>
                  <Text fontSize="md" color={colors.textMuted} lineHeight="1.8">
                    Automated lease analysis tool that extracts key terms, critical dates, 
                    and financial obligations from complex lease documents. Quickly understand 
                    renewal options, escalation clauses, and operating expense structures.
                  </Text>
                  <Box pt={4} w="100%">
                    <NextLink href="/contact" passHref legacyBehavior>
                      <Button
                        as="a"
                        w="100%"
                        bg={colors.btnPrimaryBg}
                        color={colors.btnPrimaryColor}
                        h="52px"
                        fontSize="sm"
                        fontWeight="500"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        rightIcon={<FiArrowRight />}
                        _hover={{
                          bg: colors.btnPrimaryHoverBg,
                          transform: 'translateY(-2px)',
                        }}
                        transition="all 0.3s"
                      >
                        Request Access
                      </Button>
                    </NextLink>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>

            {/* Automated Listing Database */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                p={{ base: 8, md: 10 }}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                h="100%"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  borderColor: 'accent.gold',
                }}
              >
                <VStack align="flex-start" spacing={5}>
                  <Box p={4} bg={colors.isDark ? '#1a2830' : 'surface.cream'}>
                    <Icon as={FiDatabase} boxSize={7} color="accent.gold" />
                  </Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                  >
                    Automated Listing Database
                  </Heading>
                  <Text fontSize="md" color={colors.textMuted} lineHeight="1.8">
                    Proprietary database that aggregates off-market opportunities and 
                    exclusive listings not available on public platforms. Stay ahead of 
                    the market with early access to opportunities before they're widely marketed.
                  </Text>
                  <Box pt={4} w="100%">
                    <NextLink href="/contact" passHref legacyBehavior>
                      <Button
                        as="a"
                        w="100%"
                        bg={colors.btnPrimaryBg}
                        color={colors.btnPrimaryColor}
                        h="52px"
                        fontSize="sm"
                        fontWeight="500"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        rightIcon={<FiArrowRight />}
                        _hover={{
                          bg: colors.btnPrimaryHoverBg,
                          transform: 'translateY(-2px)',
                        }}
                        transition="all 0.3s"
                      >
                        Request Access
                      </Button>
                    </NextLink>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          </Grid>
        </Section>

        {/* Technology Capabilities */}
        <Section bg={colors.bgAlt}>
          <SectionHeading
            label="Capabilities"
            title="Technology Stack"
            description="Custom tools and platforms designed to give clients a competitive edge in their real estate decisions."
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={6}
          >
            {techFeatures.map((feature, index) => (
              <MotionBox
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  p={8}
                  bg={colors.bgCard}
                  border="1px solid"
                  borderColor={colors.border}
                  h="100%"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'lg',
                    borderColor: 'accent.gold',
                  }}
                >
                  <VStack align="flex-start" spacing={4}>
                    <Box p={3} bg={colors.isDark ? '#1a2830' : 'surface.cream'}>
                      <Icon as={feature.icon} boxSize={6} color="accent.gold" />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize="md"
                      fontFamily="heading"
                      fontWeight="400"
                      color={colors.textPrimary}
                    >
                      {feature.title}
                    </Heading>
                    <Text fontSize="sm" color={colors.textMuted} lineHeight="1.7">
                      {feature.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Section>

        {/* Interactive Tools - Space Calculator */}
        <Section bg="navy.800" id="calculator">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 16 }}
            alignItems="start"
          >
            <GridItem>
              <VStack align="flex-start" spacing={6}>
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="accent.gold"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                >
                  Interactive Tools
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color="white"
                  lineHeight="1.2"
                >
                  Office Space Calculator
                </Heading>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="whiteAlpha.800"
                  lineHeight="1.8"
                >
                  Quickly estimate your office space requirements based on headcount, 
                  work style, and desking strategy. This tool provides a starting point 
                  for space planning discussions.
                </Text>
                <Box p={6} bg="whiteAlpha.100">
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3}>
                      <Icon as={FiUsers} color="accent.gold" />
                      <Text color="white" fontSize="sm">Adjust for hybrid work patterns</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FiGrid} color="accent.gold" />
                      <Text color="white" fontSize="sm">Account for desking ratios</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FiLayers} color="accent.gold" />
                      <Text color="white" fontSize="sm">Estimate rentable square footage</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
            <GridItem>
              <SpaceCalculator colors={colors} />
            </GridItem>
          </Grid>
        </Section>

        {/* Approach Section */}
        <Section bg={colors.bgAlt}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
            gap={{ base: 8, lg: 16 }}
          >
            <GridItem>
              <VStack align="flex-start" spacing={4} position="sticky" top="120px">
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="accent.gold"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                >
                  Approach
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Technology Philosophy
                </Heading>
              </VStack>
            </GridItem>
            <GridItem>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
                {[
                  {
                    title: 'Strategy',
                    description: 'Working with corporations to align real estate decisions with broader business objectives. Technology reveals connections between space, people, and performance.',
                  },
                  {
                    title: 'Brokerage',
                    description: 'Swift, under-the-radar execution and aggressive negotiation in every market. Data-driven comps and market intelligence inform every negotiation.',
                  },
                  {
                    title: 'Technology',
                    description: 'Real-time visualizations and data tools to improve portfolio-wide decisions. Custom platforms that solve real client problems.',
                  },
                ].map((item, index) => (
                  <MotionBox
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VStack align="flex-start" spacing={3}>
                      <Heading
                        as="h3"
                        fontSize="lg"
                        fontFamily="heading"
                        fontWeight="400"
                        color={colors.textPrimary}
                      >
                        {item.title}
                      </Heading>
                      <Text fontSize="sm" color={colors.textMuted} lineHeight="1.7">
                        {item.description}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </Grid>
            </GridItem>
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section>
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            maxW="700px"
            mx="auto"
          >
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontFamily="heading"
              fontWeight="400"
              color={colors.textPrimary}
              mb={4}
            >
              Interested in technology-enabled advisory?
            </Heading>
            <Text fontSize="lg" color={colors.textMuted} mb={8}>
              Let's discuss how data and technology can transform your 
              commercial real estate decisions.
            </Text>
            <NextLink href="/contact" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                bg={colors.btnPrimaryBg}
                color={colors.btnPrimaryColor}
                px={8}
                h="56px"
                fontSize="sm"
                fontWeight="500"
                letterSpacing="0.05em"
                textTransform="uppercase"
                rightIcon={<FiArrowRight />}
                _hover={{
                  bg: colors.btnPrimaryHoverBg,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s"
              >
                Get in Touch
              </Button>
            </NextLink>
          </Flex>
        </Section>
      </Layout>
    </>
  );
}

