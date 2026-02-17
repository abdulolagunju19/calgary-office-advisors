import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Link,
  Image,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowLeft } from 'react-icons/fi';
import Layout from '../../../components/Layout';
import useColors from '../../../hooks/useColors';
import buildingsData from '../../../data/buildings.json';
import submarketsData from '../../../data/submarkets.json';
import dynamic from 'next/dynamic';
const CalgaryMap = dynamic(() => import('../../../components/CalgaryMap'), { ssr: false });

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect fill="#e2e8f0" width="400" height="240"/><text fill="#718096" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14">No image</text></svg>');

export default function BuildingsSubmarketPage({ submarket, buildings }) {
  const colors = useColors();
  if (!submarket) return null;

  const title = `${submarket.name} | Buildings | Calgary Office Advisors`;
  const description = `Office buildings in ${submarket.name}, Calgary. Informational directory—not a vacancy search.`;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="1000px" px={{ base: 4, md: 8 }}>
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
                <FiArrowLeft /> Back to locations
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={8}>
              <Box>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  {submarket.name}
                </Heading>
                <Text mt={2} fontSize="lg" color={colors.textMuted}>
                  Office buildings in this submarket
                </Text>
              </Box>

              {!buildings || buildings.length === 0 ? (
                <Text color={colors.textMuted}>No buildings listed in this submarket yet.</Text>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {buildings.map((b) => (
                    <NextLink key={b.id} href={`/buildings/${b.id}`} passHref legacyBehavior>
                      <Link
                        display="block"
                        bg={colors.bgCard}
                        border="1px solid"
                        borderColor={colors.border}
                        overflow="hidden"
                        borderRadius="md"
                        _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      >
                        <Box position="relative" h="160px" bg={colors.bgAlt}>
                          {b.photo ? (
                            <Image
                              src={b.photo}
                              alt={b.name}
                              objectFit="cover"
                              w="100%"
                              h="100%"
                            />
                          ) : (
                            <Box
                              w="100%"
                              h="100%"
                              bg={colors.border}
                              backgroundImage={`url("${PLACEHOLDER_IMAGE}")`}
                              backgroundSize="cover"
                            />
                          )}
                        </Box>
                        <Box p={4}>
                          <Text fontWeight="600" color={colors.textPrimary} fontSize="lg">
                            {b.name}
                          </Text>
                          <Text fontSize="md" color={colors.textMuted} mt={2} lineHeight="1.5">
                            {b.address}
                          </Text>
                          <Text fontSize="md" color={colors.textSecondary} mt={2} fontWeight="500">
                            View details →
                          </Text>
                        </Box>
                      </Link>
                    </NextLink>
                  ))}
                </SimpleGrid>
              )}
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticPaths() {
  const paths = submarketsData.map((s) => ({ params: { id: s.id } }));
  return { paths, fallback: false };
}

export function getStaticProps({ params }) {
  const submarket = submarketsData.find((s) => s.id === params.id) || null;
  const buildingFilter = submarket?.buildingFilter;
  const buildings = buildingFilter
    ? buildingsData.filter((b) => (b.submarket || '').toLowerCase() === buildingFilter.toLowerCase())
    : [];
  return { props: { submarket, buildings } };
}
