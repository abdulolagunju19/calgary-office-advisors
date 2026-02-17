import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Image,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import buildingsData from '../../data/buildings.json';
const CalgaryMap = dynamic(() => import('../../components/CalgaryMap'), { ssr: false });

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect fill="#e2e8f0" width="800" height="400"/><text fill="#718096" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16">No image</text></svg>');

export default function BuildingPage({ building }) {
  const colors = useColors();
  const { colorMode } = useColorMode();
  if (!building) return null;

  const title = `${building.name} | Buildings | Calgary Office Advisors`;
  const description = building.description || `${building.name}, ${building.address}. ${building.submarket || ''} office building.`;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="800px" px={{ base: 4, md: 8 }}>
            <NextLink href="/buildings" passHref legacyBehavior>
              <Link
                fontSize="sm"
                color={colors.textSecondary}
                fontWeight="500"
                mb={8}
                display="inline-flex"
                alignItems="center"
                gap={2}
                _hover={{ color: colors.textPrimary }}
              >
                <FiArrowLeft /> Back to buildings
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={10} textAlign="left">
              <Box>
                {building.submarket && (
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color={colors.textSubtle}
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    mb={2}
                  >
                    {building.submarket}
                  </Text>
                )}
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  {building.name}
                </Heading>
                <HStack mt={2} spacing={2} color={colors.textMuted}>
                  <Box as={FiMapPin} boxSize={4} />
                  <Text fontSize="md">{building.address}</Text>
                </HStack>
              </Box>

              {building.photo ? (
                <Box position="relative" w="100%" h="320px" borderRadius="lg" overflow="hidden" bg={colors.bgAlt}>
                  <Image src={building.photo} alt={building.name} objectFit="cover" w="100%" h="100%" />
                </Box>
              ) : (
                <Box
                  w="100%"
                  h="280px"
                  borderRadius="lg"
                  bg={colors.border}
                  backgroundImage={`url("${PLACEHOLDER_IMAGE}")`}
                  backgroundSize="cover"
                />
              )}

              {building.description && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    About
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {building.description}
                  </Text>
                </Box>
              )}

              {building.cost && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Cost
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {building.cost}
                  </Text>
                </Box>
              )}

              {building.amenities && building.amenities.length > 0 && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Amenities
                  </Heading>
                  <List spacing={2} styleType="disc" pl={6}>
                    {building.amenities.map((item, i) => (
                      <ListItem key={i} color={colors.textSecondary} fontSize="md" lineHeight="1.7">
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {building.history && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    History
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {building.history}
                  </Text>
                </Box>
              )}

              {building.builtReason && (
                <Box
                  p={6}
                  bg={colorMode === 'light' ? 'navy.50' : 'whiteAlpha.05'}
                  borderLeft="4px solid"
                  borderColor={colors.accent}
                  borderRadius="md"
                >
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Why it was built
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {building.builtReason}
                  </Text>
                </Box>
              )}
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticProps({ params }) {
  const building = buildingsData.find((b) => b.id === params.slug) || null;
  return { props: { building } };
}

export function getStaticPaths() {
  const paths = buildingsData.map((b) => ({ params: { slug: b.id } }));
  return { paths, fallback: false };
}
