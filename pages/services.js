import Head from 'next/head';
import NextLink from 'next/link';
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
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { 
  FiArrowRight, 
  FiFileText, 
  FiUsers, 
  FiClipboard, 
  FiTrendingUp,
  FiMapPin,
  FiBarChart2,
  FiDollarSign,
  FiCpu,
} from 'react-icons/fi';

import Layout from '../components/Layout';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import useColors from '../hooks/useColors';

const MotionBox = motion(Box);

// Core Services
const coreServices = [
  {
    icon: FiFileText,
    title: 'Transaction Management',
    description: 'End-to-end management of lease transactions, from market analysis and site tours to lease negotiation and execution. Ensuring optimal terms and seamless closings.',
    id: 'transaction',
  },
  {
    icon: FiUsers,
    title: 'Workplace Consulting',
    description: 'Strategic workplace design and planning that aligns physical space with organizational culture, employee needs, and business objectives.',
    id: 'workplace',
  },
  {
    icon: FiClipboard,
    title: 'Lease Administration',
    description: 'Comprehensive lease portfolio management including critical date tracking, expense auditing, and compliance monitoring to protect your interests.',
    id: 'lease',
  },
];

// Strategy & Analytics
const strategyServices = [
  {
    icon: FiTrendingUp,
    title: 'Strategy & Analytics',
    description: 'Data-driven real estate strategy development that connects portfolio decisions to broader business objectives and financial performance.',
    id: 'strategy',
  },
  {
    icon: FiMapPin,
    title: 'Location Strategy',
    description: 'Site selection and location analytics using demographic data, market research, and custom scoring models to identify optimal locations.',
    id: 'location',
  },
  {
    icon: FiBarChart2,
    title: 'Labor Analytics',
    description: 'Workforce availability analysis, talent mapping, and labor market intelligence to inform location decisions and workplace strategies.',
    id: 'labor',
  },
  {
    icon: FiDollarSign,
    title: 'Economic Incentives',
    description: 'Identification of economic incentives and grants to maximize the value of real estate investments and business operations.',
    id: 'incentives',
  },
];

// Technology & Intelligence
const techService = {
  icon: FiCpu,
  title: 'Business Intelligence & Technology',
  description: 'Custom analytics platforms, 3D visualizations, and data tools that transform how organizations understand and manage their real estate portfolios.',
  id: 'technology',
};

const ServiceBlock = ({ service, index, variant = 'default', colors }) => (
  <MotionBox
    id={service.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Box
      p={{ base: 6, md: 10 }}
      bg={variant === 'featured' ? 'navy.800' : colors.bgCard}
      border={variant === 'featured' ? 'none' : '1px solid'}
      borderColor={colors.border}
      h="100%"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
    >
      <VStack align="flex-start" spacing={5}>
        <Box
          p={4}
          bg={variant === 'featured' ? 'whiteAlpha.100' : (colors.isDark ? '#1a2830' : 'surface.cream')}
        >
          <Icon 
            as={service.icon} 
            boxSize={7} 
            color="accent.gold" 
          />
        </Box>
        <Heading
          as="h3"
          fontSize={{ base: 'lg', md: 'xl' }}
          fontFamily="heading"
          fontWeight="400"
          color={variant === 'featured' ? 'white' : colors.textPrimary}
        >
          {service.title}
        </Heading>
        <Text
          fontSize="md"
          color={variant === 'featured' ? 'whiteAlpha.800' : colors.textMuted}
          lineHeight="1.8"
        >
          {service.description}
        </Text>
      </VStack>
    </Box>
  </MotionBox>
);

export default function Services() {
  const colors = useColors();

  const url = 'https://abdulolagunju.com/services';
  const title = 'Services | Abdul-Samad Olagunju';
  const description = 'Commercial real estate advisory services including transaction management, workplace consulting, strategy, and technology solutions.';

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
              gap={{ base: 10, lg: 20 }}
              alignItems="end"
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
                    Services
                  </Text>
                  <Heading
                    as="h1"
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    lineHeight="1.1"
                    letterSpacing="-0.02em"
                  >
                    Full-Spectrum
                    <br />
                    Advisory Services
                  </Heading>
                </MotionBox>
              </GridItem>
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={colors.textMuted}
                    lineHeight="1.8"
                  >
                    From transaction execution to strategic planning, I provide 
                    comprehensive commercial real estate services designed to 
                    optimize your portfolio and align real estate decisions with 
                    business objectives.
                  </Text>
                </MotionBox>
              </GridItem>
            </Grid>
          </Container>
        </Box>

        {/* Core Services */}
        <Section bg={colors.bgAlt}>
          <SectionHeading
            label="Core Services"
            title="Transaction & Operations"
            description="Essential services for executing real estate transactions and managing ongoing portfolio operations."
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
          >
            {coreServices.map((service, index) => (
              <ServiceBlock 
                key={service.id} 
                service={service}
                colors={colors} 
                index={index} 
              />
            ))}
          </Grid>
        </Section>

        {/* Strategy & Analytics */}
        <Section>
          <SectionHeading
            label="Strategy & Analytics"
            title="Data-Driven Decisions"
            description="Strategic services that leverage analytics and market intelligence to inform real estate decisions."
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {strategyServices.map((service, index) => (
              <ServiceBlock 
                key={service.id} 
                service={service}
                colors={colors} 
                index={index} 
              />
            ))}
          </Grid>
        </Section>

        {/* Technology & Intelligence - Featured */}
        <Section bg="navy.800" id="technology">
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
                  Technology & Intelligence
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color="white"
                  lineHeight="1.2"
                >
                  {techService.title}
                </Heading>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="whiteAlpha.800"
                  lineHeight="1.8"
                >
                  {techService.description}
                </Text>
                <Text
                  fontSize="md"
                  color="whiteAlpha.700"
                  lineHeight="1.8"
                >
                  I develop custom tools and platforms that give clients unprecedented 
                  visibility into their real estate decisions. From interactive space 
                  calculators to 3D conversion visualizers, technology is at the heart 
                  of my advisory practice.
                </Text>
                <NextLink href="/technology" passHref legacyBehavior>
                  <Button
                    as="a"
                    bg="accent.gold"
                    color="navy.900"
                    px={8}
                    h="56px"
                    fontSize="sm"
                    fontWeight="600"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: '#d4ac2b',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    Explore Technology
                  </Button>
                </NextLink>
              </VStack>
            </GridItem>
            <GridItem>
              <Box
                bg="navy.700"
                p={{ base: 4, md: 8 }}
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {[
                    { label: '3D Visualization', desc: 'Interactive space models' },
                    { label: 'Market Analytics', desc: 'Real-time data insights' },
                    { label: 'Space Planning', desc: 'Optimization tools' },
                    { label: 'Portfolio Dashboard', desc: 'Centralized tracking' },
                  ].map((item, index) => (
                    <Box
                      key={item.label}
                      p={4}
                      bg="whiteAlpha.100"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="white"
                        mb={1}
                      >
                        {item.label}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="whiteAlpha.600"
                      >
                        {item.desc}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Section>

        {/* Process Section */}
        <Section bg={colors.bgAlt}>
          <SectionHeading
            label="Process"
            title="How We Work Together"
            description="A structured approach to delivering exceptional outcomes."
            align="center"
          />
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
            gap={{ base: 8, md: 6 }}
          >
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your business objectives, constraints, and real estate requirements.' },
              { step: '02', title: 'Analysis', desc: 'Market research, data analysis, and strategic options development.' },
              { step: '03', title: 'Strategy', desc: 'Collaborative strategy development aligned with your goals.' },
              { step: '04', title: 'Execution', desc: 'Transaction management, negotiation, and implementation.' },
            ].map((item, index) => (
              <MotionBox
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VStack 
                  align={{ base: 'flex-start', md: 'center' }} 
                  textAlign={{ base: 'left', md: 'center' }}
                  spacing={4}
                >
                  <Text
                    fontFamily="heading"
                    fontSize="4xl"
                    color="accent.gold"
                    fontWeight="400"
                  >
                    {item.step}
                  </Text>
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
                    {item.desc}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', lg: 'center' }}
            gap={8}
          >
            <VStack align="flex-start" spacing={4} maxW="600px">
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontFamily="heading"
                fontWeight="400"
                color={colors.textPrimary}
              >
                Ready to get started?
              </Heading>
              <Text fontSize="lg" color={colors.textMuted}>
                Let's discuss your real estate needs and explore how my services 
                can support your objectives.
              </Text>
            </VStack>
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
                Start a Conversation
              </Button>
            </NextLink>
          </Flex>
        </Section>
      </Layout>
    </>
  );
}

