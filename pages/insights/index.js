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
      <NextSeo title={title} description={description}
        openGraph={{
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/insights`,
          images: [
            {
              url: companiesData[0]?.image || '/images/Headshot.jfif',
              width: 800,
              height: 600,
              alt: companiesData[0]?.name || 'Calgary Office Advisors',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/insights`}
      />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/insights`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/insights`,
          image: companiesData[0]?.image || '/images/Headshot.jfif',
          mainEntity: companiesData.map(c => ({
            '@type': 'Organization',
            name: c.name,
            address: c.address,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/insights/company/${c.id}`,
          })),
        }) }} />
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
                  Calgary Business Directory
                </Heading>
                <Text mt={4} fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="640px">
                  Businesses in Calgary.
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

              {/* Calgary Company Intelligence – bottom section */}
              <Box pt={8} borderTop="1px solid" borderColor={colors.border}>
                <Heading
                  as="h2"
                  size="lg"
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  mb={2}
                >
                  Calgary Company Intelligence
                </Heading>
                <Text fontSize="md" color={colors.textMuted} mb={8} lineHeight="1.7">
                  Strategic resources for tracking office demand, expansion signals, and market opportunities.
                </Text>

                <VStack align="stretch" spacing={3} mb={10}>
                  <NextLink href="https://www.merx.com/public/solicitations/open" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        MERX: Canadian Government Tender Database
                      </Text>
                    </Link>
                  </NextLink>

                  <NextLink href="https://www.alberta.ca/grant-payments-disclosure-table" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        Government Grants Payments
                      </Text>
                    </Link>
                  </NextLink>

                  <NextLink href="https://majorprojects.alberta.ca/" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        Government of Alberta Major Projects
                      </Text>
                    </Link>
                  </NextLink>

                  <NextLink href="https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/guest" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        Office of the Commissioner of Lobbying of Canada
                      </Text>
                    </Link>
                  </NextLink>

                  <NextLink href="https://competition-bureau.canada.ca/en/mergers-and-acquisitions/report-concluded-merger-reviews" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        M&A Canada
                      </Text>
                    </Link>
                  </NextLink>

                  <NextLink href="https://innovation.ised-isde.canada.ca/innovation/s/?language=en_CA" passHref legacyBehavior>
                    <Link
                      display="flex"
                      alignItems="center"
                      p={4}
                      bg={colors.bgCard}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      _hover={{ borderColor: colors.borderHover, textDecoration: 'none' }}
                      isExternal
                    >
                      <Text fontSize="md" fontWeight="500" color={colors.textPrimary}>
                        Business Grant
                      </Text>
                    </Link>
                  </NextLink>
                </VStack>
              </Box>

              {/* Articles Section */}
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
                    No posts yet. Add markdown files to <code>data/insights/</code> with frontmatter (title, date, excerpt).
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
