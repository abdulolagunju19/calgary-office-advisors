import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowLeft } from 'react-icons/fi';
import Layout from '../../../components/Layout';
import useColors from '../../../hooks/useColors';
import coworkingData from '../../../data/coworking.json';
import submarketsData from '../../../data/submarkets.json';

export default function CoworkingSubmarketPage({ submarket, spaces }) {
  const colors = useColors();
  if (!submarket) return null;

  const title = `${submarket.name} | Coworking | Calgary Office Advisors`;
  const description = `Coworking spaces in ${submarket.name}, Calgary. A curated list for reference.`;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="720px" px={{ base: 4, md: 8 }}>
            <NextLink href="/coworking" passHref legacyBehavior>
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
                  Coworking spaces in this submarket
                </Text>
              </Box>

              {!spaces || spaces.length === 0 ? (
                <Text color={colors.textMuted}>No coworking spaces listed in this submarket yet.</Text>
              ) : (
                <VStack align="stretch" spacing={0} borderTop="1px solid" borderColor={colors.border}>
                  {spaces.map((entry) => (
                    <NextLink key={entry.id} href={`/coworking/${entry.id}`} passHref legacyBehavior>
                      <Link
                        display="block"
                        py={8}
                        borderBottom="1px solid"
                        borderColor={colors.border}
                        _hover={{ textDecoration: 'none', bg: colors.bgAlt }}
                        px={2}
                        mx={-2}
                        borderRadius="md"
                      >
                        <Text fontWeight="600" color={colors.textPrimary} fontSize="xl">
                          {entry.name}
                        </Text>
                        <Text fontSize="md" color={colors.textSubtle} mt={1}>
                          {entry.location}
                        </Text>
                        <Text fontSize="lg" color={colors.textSecondary} mt={3} lineHeight="1.7">
                          {entry.description}
                        </Text>
                        <Text fontSize="md" color={colors.textSecondary} mt={2} fontWeight="500">
                          View details →
                        </Text>
                      </Link>
                    </NextLink>
                  ))}
                </VStack>
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
  const coworkingFilter = submarket?.coworkingFilter;
  const spaces = coworkingFilter
    ? coworkingData.filter((e) => (e.submarket || '').toLowerCase() === coworkingFilter.toLowerCase())
    : [];
  return { props: { submarket, spaces } };
}
