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

export default function VictoriaParkBIA() {
  const colors = useColors();
  const title = 'Victoria Park Business Improvement Area | Calgary Office Advisors';
  const description = 'Office and coworking space in Calgary\'s emerging Victoria Park district. Mix of historic buildings and new developments near downtown.';

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
                <Badge colorScheme="green" fontSize="xs" mb={4}>
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
                  Victoria Park Business Improvement Area
                </Heading>
                <Text fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="720px">
                  Emerging district on the eastern edge of downtown. Mix of heritage buildings and new mixed-use developments. Growing food, entertainment, and professional services scene. Well-positioned for tenants who want downtown proximity without downtown pricing.
                </Text>
              </Box>

              {/* Neighborhood Character */}
              <Box>
                <Heading as="h2" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
                  Neighborhood Character
                </Heading>
                <Text fontSize="md" color={colors.textMuted} lineHeight="1.7" mb={4}>
                  Victoria Park is in transition. Once primarily industrial, it's now a mixed-use district with new residential towers, street-level retail, and adaptive reuse projects converting historic warehouses into office and hospitality spaces.
                </Text>
                <Text fontSize="md" color={colors.textMuted} lineHeight="1.7">
                  The area benefits from proximity to the Stampede Grounds, the Elbow River pathway system, and a 10-minute walk to downtown core. Office rents are competitive, and the neighborhood is attracting food and beverage operators, creative agencies, and startups.
                </Text>
              </Box>

              {/* Ideal Tenant Types */}
              <Box>
                <Heading as="h2" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
                  Ideal Tenant Types
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FeatureCard
                    title="Food & Beverage"
                    description="Restaurants, cafes, and hospitality operators benefiting from residential growth and Stampede traffic."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Startups & Tech"
                    description="Early-stage companies seeking affordable office space with downtown proximity and modern infrastructure."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Creative Agencies"
                    description="Design, media, and production companies looking for character spaces in heritage buildings."
                    colors={colors}
                  />
                  <FeatureCard
                    title="Professional Services"
                    description="Legal, accounting, and consulting firms targeting cost-conscious clients in an accessible location."
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
                      Adaptive Reuse
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Warehouse conversions with exposed brick, high ceilings, and industrial character
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      New Build Offices
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Ground floor and podium offices in new mixed-use towers
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Coworking
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Flexible memberships and small private offices in modern spaces
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="md" fontWeight="600" color={colors.textPrimary} w="180px">
                      Retail + Office
                    </Text>
                    <Text fontSize="md" color={colors.textMuted}>
                      Storefront visibility with back-office or second-floor workspace
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
                  See Available Space in Victoria Park
                </Heading>
                <Text fontSize="md" color={colors.textMuted} mb={6}>
                  Browse coworking options and small office listings in the Victoria Park area.
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
