import Head from 'next/head';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
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
import companiesData from '../../../data/companies.json';

const CompaniesMap = dynamic(() => import('../../../components/CompaniesMap'), { ssr: false });

export default function CompanyPage({ company }) {
  const colors = useColors();
  if (!company) return null;

  const title = `${company.name} | Companies | Calgary Office Advisors`;
  const description = company.description || `${company.name} — ${company.address}. ${company.category || ''}`.trim();

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="800px" px={{ base: 4, md: 8 }}>
            <NextLink href="/insights" passHref legacyBehavior>
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
                <FiArrowLeft /> Back to companies
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={8} textAlign="left">
              <Box>
                {company.category && (
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color={colors.textSubtle}
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    mb={2}
                  >
                    {company.category}
                  </Text>
                )}
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  {company.name}
                </Heading>
                {company.address && (
                  <Text fontSize="lg" color={colors.textMuted} mt={3} lineHeight="1.5">
                    {company.address}
                  </Text>
                )}
                {company.website && (
                  <Link
                    href={company.website}
                    isExternal
                    fontSize="md"
                    color={colors.textSecondary}
                    fontWeight="500"
                    mt={3}
                    display="inline-block"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Visit website →
                  </Link>
                )}
              </Box>

              {company.description && (
                <Text fontSize="md" color={colors.textSecondary} lineHeight="1.7">
                  {company.description}
                </Text>
              )}

              {company.lat != null && company.lng != null && (
                <Box w="100%" mt={4}>
                  <Text fontSize="sm" fontWeight="600" color={colors.textSubtle} mb={3}>
                    Location
                  </Text>
                  <CompaniesMap companies={[company]} />
                </Box>
              )}
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticPaths() {
  const paths = companiesData.map((c) => ({ params: { id: c.id } }));
  return { paths, fallback: false };
}

export function getStaticProps({ params }) {
  const company = companiesData.find((c) => c.id === params.id) || null;
  return { props: { company } };
}
