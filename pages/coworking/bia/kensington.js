import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiMapPin } from 'react-icons/fi';
import Layout from '../../../components/Layout';
import useColors from '../../../hooks/useColors';

const FeatureCard = ({ title, description, colors }) => (
  <Box
    p={5}
    bg={colors.bgCard}
    border="1px solid"
    borderColor={colors.border}
    borderRadius="md"
  >
    <Text fontWeight="600" fontSize="md" color={colors.textPrimary} mb={2}>
      {title}
    </Text>
    <Text fontSize="sm" color={colors.textMuted} lineHeight="1.6">
      {description}
    </Text>
  </Box>
);

export default function KensingtonBIA() {
  const colors = useColors();
  const title = 'Kensington Business Improvement Area | Calgary Office Advisors';
  const description = 'Office and coworking space in Calgary\'s creative Kensington district. Ideal for agencies, consultants, and lifestyle brands.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="1000px" px={{ base: 4, md: 8 }}>
            <VStack align="stretch" spacing={10}>
              {/* Header */}
              <Box>
                <Badge colorScheme="purple" fontSize="xs" mb={4}>
                  BUSINESS IMPROVEMENT AREA
                </Badge>
                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  mb={4}
                >
                  Kensington Business Improvement Area
                </Heading>
                <Text fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="720px">
                  Calgary's creative hub. Independent shops, cafes, art galleries, and a walkable neighborhood feel. Strong community identity and a natural fit for creative agencies, consultants, and lifestyle brands seeking character over corporate polish.
                </Text>
              </Box>

              {/* Neighborhood Character */}
              <Box>
                <Heading as="h2" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
                  Neighborhood Character
                </Heading>
                <Text fontSize="md" color={colors.textMuted} lineHeight="1.7" mb={4}>
                  Kensington is one of Calgary's most distinctive neighborhoods. Located just northwest of downtown, it blends heritage buildings with modern infill. The main strip along Kensington Road features independent retailers, bookstores, and restaurants.
                </Text>
                <Text fontSize="md" color={colors.textMuted} lineHeight="1.7">
                  The area attracts young professionals, creative entrepreneurs, and established small businesses looking for a neighborhood with identity. Office rents are moderate, and coworking options are growing.
                </Text>
              </Box>

              {/* Ideal Tenant Types */}
              <Box>
                <Heading as="h2" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
                  Ideal Tenant Types
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FeatureCard
                    title="Creative Agencies"
                    description="Design studios, marketing agencies, and content creators who value neighborhood atmosphere and client experience."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Independent Consultants"
                    description="Freelancers and small consultancies who want walkable access to cafes and a community-oriented environment."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Lifestyle Brands"
                    description="E-commerce, apparel, and wellness companies that benefit from proximity to retail and a creative customer base."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Professional Services"
                    description="Therapists, financial planners, and coaches seeking a welcoming, non-corporate setting for client meetings."
                    colors={colors}
                  />
                </SimpleGrid>
              </Box>

              {/* Available Space Types */}
              <Box>
                <Heading as="h2" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
                  Available Space Types
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Coworking Spaces
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Hot desks, dedicated desks, and small private offices
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Above-Retail Offices
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      500–2,000 sq ft suites in heritage and mid-rise buildings
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Small Suites
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      1–5 person offices, often with shared amenities
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Storefront Offices
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Ground floor visibility for client-facing businesses
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* CTA Section */}
              <Box
                p={8}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="lg"
                textAlign="center"
              >
                <Heading as="h3" fontSize="xl" fontWeight="600" color={colors.textPrimary} mb={3}>
                  See Available Space in Kensington
                </Heading>
                <Text fontSize="md" color={colors.textMuted} mb={6}>
                  Browse coworking options and small office listings in the Kensington area.
                </Text>
                <HStack spacing={4} justify="center" flexWrap="wrap">
                  <NextLink href="/coworking/submarket/beltline" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="md"
                      leftIcon={<FiMapPin />}
                      bg={colors.accent}
                      color="white"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                    >
                      View Coworking Spaces
                    </Button>
                  </NextLink>
                  <NextLink href="/buildings/submarket/beltline" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="md"
                      variant="outline"
                      borderColor={colors.border}
                      color={colors.textPrimary}
                      _hover={{ bg: colors.bgHover }}
                    >
                      View Office Buildings
                    </Button>
                  </NextLink>
                </HStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
