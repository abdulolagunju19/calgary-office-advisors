import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { FiArrowLeft } from 'react-icons/fi';
import Layout from '../../components/Layout';
import { getInsightBySlug, getInsightSlugs } from '../../lib/insights';
import useColors from '../../hooks/useColors';

const mdComponents = (colors) => ({
  p: ({ children }) => <Text as="p" fontSize="md" color={colors.textSecondary} lineHeight="1.8" mb={4}>{children}</Text>,
  h2: ({ children }) => <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mt={8} mb={4}>{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" size="sm" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mt={6} mb={3}>{children}</Heading>,
  ul: ({ children }) => <Box as="ul" pl={6} mb={4} sx={{ '& li': { color: colors.textSecondary, lineHeight: 1.8, mb: 1 } }}>{children}</Box>,
  ol: ({ children }) => <Box as="ol" pl={6} mb={4} sx={{ '& li': { color: colors.textSecondary, lineHeight: 1.8, mb: 1 } }}>{children}</Box>,
  strong: ({ children }) => <Text as="strong" fontWeight="600" color={colors.textPrimary}>{children}</Text>,
});

export default function InsightPost({ post }) {
  const colors = useColors();
  if (!post) return null;
  const title = `${post.title} | Calgary Office Advisors`;
  const description = post.excerpt || post.title;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="720px" px={{ base: 4, md: 8 }}>
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
                <FiArrowLeft /> Back to Insights
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={8} textAlign="left">
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Insight
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  lineHeight="1.3"
                >
                  {post.title}
                </Heading>
                {post.date && (
                  <Text mt={3} fontSize="sm" color={colors.textSubtle}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </Text>
                )}
              </Box>

              <Box
                className="insight-body"
                sx={{
                  '& p': { mb: 4 },
                  '& ul, & ol': { pl: 6, mb: 4 },
                  '& li': { mb: 1, lineHeight: 1.8 },
                }}
              >
                <ReactMarkdown components={mdComponents(colors)}>
                  {post.content}
                </ReactMarkdown>
              </Box>

              <NextLink href="/insights" passHref legacyBehavior>
                <Link fontSize="sm" color={colors.textSecondary} fontWeight="500" _hover={{ color: colors.textPrimary }}>
                  ← All insights
                </Link>
              </NextLink>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticProps({ params }) {
  const post = getInsightBySlug(params.slug);
  return { props: { post: post || null } };
}

export function getStaticPaths() {
  const slugs = getInsightSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}
