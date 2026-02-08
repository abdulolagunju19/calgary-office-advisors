import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
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
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { FiArrowRight, FiCheck, FiArrowUpRight } from 'react-icons/fi';

import Layout from '../components/Layout';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import useColors from '../hooks/useColors';

const MotionBox = motion(Box);

const coreValues = [
  {
    title: 'Strategic Thinking',
    description: 'Every real estate decision is viewed through the lens of broader business objectives. I focus on outcomes that drive organizational success.',
  },
  {
    title: 'Data-Driven Approach',
    description: 'Leveraging analytics, market intelligence, and technology to provide clients with comprehensive insights for informed decision-making.',
  },
  {
    title: 'Client-First Philosophy',
    description: 'As an occupier-exclusive advisor at Cresa, my loyalty is undivided. I represent only tenants and buyers—never landlords.',
  },
  {
    title: 'Innovation & Technology',
    description: 'Constantly exploring new tools and methodologies to deliver better outcomes, from 3D visualizations to custom analytics platforms.',
  },
];

const expertise = [
  'Tenant Representation',
  'Lease Negotiation',
  'Workplace Strategy',
  'Market Analysis',
  'Location Analytics',
  'Portfolio Optimization',
  'Transaction Management',
  'Economic Incentives',
];

export default function About() {
  const colors = useColors();

  const url = 'https://abdulolagunju.com/about';
  const title = 'About | Abdul-Samad Olagunju';
  const description = 'Commercial Real Estate Advisor at Cresa. Strategic thinker, technology enthusiast, and dedicated advocate for corporate tenants.';

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
              gap={{ base: 12, lg: 20 }}
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
                    About
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
                    Bridging Strategy
                    <br />
                    and Real Estate
                  </Heading>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={colors.textMuted}
                    lineHeight="1.8"
                    maxW="500px"
                  >
                    I'm a Commercial Real Estate Advisor at Cresa, the world's largest 
                    occupier-only commercial real estate firm. My approach combines 
                    strategic advisory with data-driven insights to help organizations 
                    make better real estate decisions.
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
                    bg={colors.bgAlt}
                    p={{ base: 8, md: 12 }}
                    position="relative"
                  >
                    <VStack align="flex-start" spacing={6}>
                      <Box
                        w={{ base: '120px', md: '150px' }}
                        h={{ base: '120px', md: '150px' }}
                        position="relative"
                        overflow="hidden"
                        borderRadius="sm"
                        boxShadow="lg"
                      >
                        <Image
                          src="/images/Abdul O Headshot.jpg"
                          alt="Abdul-Samad Olagunju"
                          fill
                          style={{ objectFit: 'cover' }}
                          priority
                        />
                      </Box>
                      <Box>
                        <Heading
                          as="h2"
                          fontSize="xl"
                          fontFamily="heading"
                          fontWeight="400"
                          color={colors.textPrimary}
                          mb={2}
                        >
                          Abdul-Samad Olagunju
                        </Heading>
                        <Text color={colors.textMuted} fontSize="sm">
                          Commercial Real Estate Advisor
                        </Text>
                        <Link
                          href="https://www.cresa.com"
                          isExternal
                          color="accent.gold"
                          fontWeight="600"
                          fontSize="sm"
                        >
                          Cresa
                        </Link>
                      </Box>
                      <HStack spacing={4}>
                        <Link href="https://www.linkedin.com/in/abdul-samad-olagunju-727877167/" isExternal>
                          <Button
                            size="sm"
                            variant="outline"
                            borderColor={colors.btnOutlineBorder}
                            color={colors.btnOutlineColor}
                            rightIcon={<FiArrowUpRight />}
                            _hover={{ bg: colors.isDark ? 'whiteAlpha.100' : 'navy.50' }}
                          >
                            LinkedIn
                          </Button>
                        </Link>
                        <NextLink href="/contact" passHref legacyBehavior>
                          <Button
                            as="a"
                            size="sm"
                            bg={colors.btnPrimaryBg}
                            color={colors.btnPrimaryColor}
                            rightIcon={<FiArrowRight />}
                            _hover={{ bg: colors.btnPrimaryHoverBg }}
                          >
                            Contact
                          </Button>
                        </NextLink>
                      </HStack>
                    </VStack>
                    {/* Decorative Element */}
                    <Box
                      position="absolute"
                      bottom="-12px"
                      right="-12px"
                      w="60px"
                      h="60px"
                      border="2px solid"
                      borderColor="accent.gold"
                    />
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>
          </Container>
        </Box>

        {/* Narrative Section */}
        <Section bg={colors.bgAlt}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
            gap={{ base: 8, lg: 16 }}
          >
            <GridItem>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="accent.gold"
                letterSpacing="0.15em"
                textTransform="uppercase"
                position="sticky"
                top="120px"
              >
                My Story
              </Text>
            </GridItem>
            <GridItem>
              <VStack align="flex-start" spacing={6}>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color={colors.textPrimary}
                  lineHeight="1.8"
                  fontFamily="heading"
                >
                  My journey into commercial real estate was driven by a passion 
                  for solving complex problems at the intersection of business strategy, 
                  data analytics, and spatial intelligence.
                </Text>
                <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                  At Cresa, I work exclusively on behalf of occupiers—corporations, 
                  organizations, and institutions seeking space. This occupier-only 
                  model means my advice is always aligned with client interests, 
                  free from the conflicts that arise when representing both sides 
                  of a transaction.
                </Text>
                <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                  I bring a technology-forward perspective to commercial real estate, 
                  developing custom visualization tools and analytics platforms that 
                  help clients see their decisions in new ways. Whether it's mapping 
                  labor markets for site selection or creating 3D models of space 
                  conversions, I believe better data leads to better decisions.
                </Text>
                <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                  My approach is fundamentally advisory—I'm not just executing 
                  transactions, but helping clients think strategically about how 
                  real estate supports their broader organizational objectives. 
                  Every lease, every location decision, every workplace design 
                  choice should connect back to business goals.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Section>

        {/* Values Section */}
        <Section>
          <SectionHeading
            label="Philosophy"
            title="Core Values"
            description="The principles that guide my approach to client service and professional practice."
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {coreValues.map((value, index) => (
              <MotionBox
                key={value.title}
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
                    borderColor: colors.borderHover,
                    boxShadow: 'lg',
                  }}
                >
                  <Heading
                    as="h3"
                    fontSize="lg"
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    mb={3}
                  >
                    {value.title}
                  </Heading>
                  <Text fontSize="sm" color={colors.textMuted} lineHeight="1.7">
                    {value.description}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Section>

        {/* Expertise Section */}
        <Section bg="navy.800">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 20 }}
            alignItems="center"
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
                  Expertise
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color="white"
                  lineHeight="1.2"
                >
                  Areas of Focus
                </Heading>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="whiteAlpha.800"
                  lineHeight="1.8"
                >
                  My practice spans the full spectrum of commercial real estate 
                  advisory services, with particular expertise in tenant-focused 
                  strategies and technology-enabled solutions.
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {expertise.map((item, index) => (
                  <MotionBox
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <HStack
                      spacing={3}
                      p={4}
                      bg="whiteAlpha.100"
                    >
                      <Box
                        w="6px"
                        h="6px"
                        bg="accent.gold"
                        borderRadius="full"
                      />
                      <Text color="white" fontSize="sm" fontWeight="500">
                        {item}
                      </Text>
                    </HStack>
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
              Let's work together
            </Heading>
            <Text fontSize="lg" color={colors.textMuted} mb={8}>
              Whether you're navigating a complex lease negotiation, optimizing 
              your portfolio, or exploring new markets, I'd love to discuss how 
              I can help.
            </Text>
            <HStack spacing={4}>
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
              <NextLink href="/services" passHref legacyBehavior>
                <Button
                  as="a"
                  size="lg"
                  variant="outline"
                  borderColor={colors.btnOutlineBorder}
                  color={colors.btnOutlineColor}
                  px={8}
                  h="56px"
                  fontSize="sm"
                  fontWeight="500"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  _hover={{ bg: colors.isDark ? 'whiteAlpha.100' : 'navy.50' }}
                >
                  View Services
                </Button>
              </NextLink>
            </HStack>
          </Flex>
        </Section>
      </Layout>
    </>
  );
}

