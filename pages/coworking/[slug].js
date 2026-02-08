import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  List,
  ListItem,
  Image,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import coworkingData from '../../data/coworking.json';

export default function CoworkingPage({ space }) {
  const colors = useColors();
  if (!space) return null;

  const title = `${space.name} | Coworking | Calgary Office Advisors`;
  const description = space.description || `${space.name}, ${space.location}.`;

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
                <FiArrowLeft /> Back to coworking
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={8} textAlign="left">
              {space.image && (
                <Box
                  w="100%"
                  borderRadius="lg"
                  overflow="hidden"
                  bg={colors.bgAlt}
                  position="relative"
                  aspectRatio="16/9"
                >
                  <Image
                    src={space.image}
                    alt={space.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
              )}

              <Box>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  {space.name}
                </Heading>
                <Box mt={2} display="flex" alignItems="center" gap={2} color={colors.textMuted}>
                  <Box as={FiMapPin} boxSize={4} />
                  <Text fontSize="md">{space.location}</Text>
                </Box>
              </Box>

              {space.description && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    About
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {space.description}
                  </Text>
                </Box>
              )}

              {space.cost && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Cost
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {space.cost}
                  </Text>
                </Box>
              )}

              {space.amenities && space.amenities.length > 0 && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Amenities
                  </Heading>
                  <List spacing={2} styleType="disc" pl={6}>
                    {space.amenities.map((item, i) => (
                      <ListItem key={i} color={colors.textSecondary} fontSize="md" lineHeight="1.7">
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {space.history && (
                <Box>
                  <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mb={3}>
                    Context
                  </Heading>
                  <Text fontSize="md" color={colors.textSecondary} lineHeight="1.8">
                    {space.history}
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
  const space = coworkingData.find((c) => c.id === params.slug) || null;
  return { props: { space } };
}

export function getStaticPaths() {
  const paths = coworkingData.map((c) => ({ params: { slug: c.id } }));
  return { paths, fallback: false };
}
