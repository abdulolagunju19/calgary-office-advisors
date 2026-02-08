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
  SimpleGrid,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import Layout from '../../components/Layout';
import { getAllInsights } from '../../lib/insights';
import useColors from '../../hooks/useColors';
import companiesData from '../../data/companies.json';

const CompaniesMap = dynamic(() => import('../../components/CompaniesMap'), { ssr: false });

export default function CompaniesPage({ insights }) {
  const colors = useColors();
  const title = 'Companies | Calgary Office Advisors';
  const description = 'Calgary business directory and map. Plus articles and commentary on commercial real estate: leasing strategy, office trends, and move planning.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="1000px" px={{ base: 4, md: 8 }}>
            <VStack align="stretch" spacing={12}>
              {/* Companies – directory + map */}
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Companies
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Calgary business directory
                </Heading>
                <Text mt={4} fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="640px">
                  Businesses in the Calgary.
                </Text>

                <Box mt={8}>
                  <CompaniesMap companies={companiesData} />
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8}>
                  {companiesData.map((company) => (
                    <NextLink key={company.id} href={`/insights/company/${company.id}`} passHref legacyBehavior>
                      <Link
                        display="block"
                        p={5}
                        bg={colors.bgCard}
                        border="1px solid"
                        borderColor={colors.border}
                        borderRadius="md"
                        _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                        transition="border-color 0.2s"
                      >
                        <Text fontWeight="600" color={colors.textPrimary} fontSize="lg">
                          {company.name}
                        </Text>
                        {company.category && (
                          <Text fontSize="sm" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.05em" mt={1}>
                            {company.category}
                          </Text>
                        )}
                        <Text fontSize="md" color={colors.textMuted} mt={2} lineHeight="1.5">
                          {company.address}
                        </Text>
                        <Text fontSize="md" color={colors.textSecondary} mt={2} fontWeight="500">
                          View details →
                        </Text>
                      </Link>
                    </NextLink>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Articles and commentary – bottom section */}
              <Box pt={8} borderTop="1px solid" borderColor={colors.border}>
                <Heading
                  as="h2"
                  size="lg"
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  mb={2}
                >
                  Articles and commentary
                </Heading>
                <Text fontSize="md" color={colors.textMuted} mb={8} lineHeight="1.7">
                  Leasing strategy, office trends, incentives, mistakes to avoid, market context, and move planning. No sales language—just practical reference.
                </Text>

                {!insights || insights.length === 0 ? (
                  <Text color={colors.textMuted}>
                    No posts yet. Add markdown files to <code>content/insights/</code> with frontmatter (title, date, excerpt).
                  </Text>
                ) : (
                  <VStack align="stretch" spacing={0} borderTop="1px solid" borderColor={colors.border}>
                    {insights.map((post) => (
                      <Box
                        key={post.slug}
                        borderBottom="1px solid"
                        borderColor={colors.border}
                      >
                        <NextLink href={`/insights/${post.slug}`} passHref legacyBehavior>
                          <Link display="block" py={8} _hover={{ textDecoration: 'none' }}>
                            <Text fontSize="md" color={colors.textSubtle} mb={2}>
                              {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
                            </Text>
                            <Heading
                              as="h3"
                              fontSize={{ base: 'xl', md: '2xl' }}
                              fontFamily="heading"
                              fontWeight="400"
                              color={colors.textPrimary}
                              mb={2}
                              _hover={{ color: colors.textSecondary }}
                            >
                              {post.title}
                            </Heading>
                            <Text fontSize="md" color={colors.textMuted} lineHeight="1.6">
                              {post.excerpt}
                            </Text>
                            <Text mt={2} fontSize="md" color={colors.textSecondary} fontWeight="500">
                              Read →
                            </Text>
                          </Link>
                        </NextLink>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticProps() {
  let insights = [];
  try {
    insights = getAllInsights();
  } catch (e) {
    console.warn('Insights load failed:', e.message);
  }
  return { props: { insights } };
}
