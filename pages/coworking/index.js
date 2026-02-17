import Head from 'next/head';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import SubmarketCard from '../../components/SubmarketCard';
import submarketsData from '../../data/submarkets.json';
import coworkingData from '../../data/coworking.json';

const CalgaryMap = dynamic(() => import('../../components/CalgaryMap'), { ssr: false });

const BIACard = ({ name, description, href, colors }) => (
  <NextLink href={href} passHref legacyBehavior>
    <Link
      display="block"
      p={6}
      bg={colors.bgCard}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="lg"
      transition="all 0.25s"
      _hover={{
        borderColor: colors.borderHover,
        textDecoration: 'none',
        transform: 'translateY(-2px)',
        boxShadow: 'md',
      }}
    >
      <Heading
        as="h3"
        fontSize="xl"
        fontWeight="600"
        color={colors.textPrimary}
        mb={3}
      >
        {name}
      </Heading>
      <Text fontSize="md" color={colors.textMuted} lineHeight="1.7">
        {description}
      </Text>
      <Text mt={4} fontSize="sm" color={colors.textSecondary} fontWeight="600">
        Explore neighborhood →
      </Text>
    </Link>
  </NextLink>
);

export default function CoworkingIndex() {
  const colors = useColors();
  const title = 'Coworking | Calgary Office Advisors';
  const description = 'Browse coworking spaces by Calgary submarket. A curated list for reference.';

  return (
    <>
      <NextSeo title={title} description={description}
        openGraph={{
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/coworking`,
          images: [
            {
              url: coworkingData[0]?.image || '/images/Headshot.jfif',
              width: 800,
              height: 600,
              alt: coworkingData[0]?.name || 'Calgary Office Advisors',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/coworking`}
      />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/coworking`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/coworking`,
          image: coworkingData[0]?.image || '/images/Headshot.jfif',
          mainEntity: coworkingData.map(c => ({
            '@type': 'Place',
            name: c.name,
            address: c.address,
            geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/coworking/${c.id}`,
          })),
        }) }} />
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="1000px" px={{ base: 4, md: 8 }}>
            <VStack align="stretch" spacing={10}>
              <Box textAlign={{ base: 'left', sm: 'center' }}>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Coworking
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Locations in Calgary
                </Heading>
                <Text mt={4} fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="560px" mx={{ base: 0, sm: 'auto' }}>
                  Select a submarket to see coworking spaces in that area. A curated list for reference.
                </Text>
              </Box>

              {/* Map */}
              <Box>
                <CalgaryMap markers={coworkingData} markerColor="#38a169" />
              </Box>

              {/* All Coworking Spaces */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {coworkingData.map((space) => (
                  <NextLink key={space.id} href={`/coworking/${space.id}`} passHref legacyBehavior>
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
                        {space.name}
                      </Text>
                      <Text fontSize="sm" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.05em" mt={1}>
                        {space.submarket}
                      </Text>
                      <Text fontSize="md" color={colors.textMuted} mt={2} lineHeight="1.5">
                        {space.location}
                      </Text>
                      <Text fontSize="md" color={colors.textSecondary} mt={2} fontWeight="500">
                        View details →
                      </Text>
                    </Link>
                  </NextLink>
                ))}
              </SimpleGrid>

              {/* Business Improvement Areas */}
              <Box pt={8} borderTop="1px solid" borderColor={colors.border}>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={4}
                >
                  Business Improvement Areas
                </Text>
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="600"
                  color={colors.textPrimary}
                  mb={6}
                >
                  Explore Calgary's BIA's
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <BIACard
                    name="Kensington Business Improvement Area"
                    description="Vibrant creative district with independent shops, cafes, and a strong community identity. Ideal for creative agencies, consultants, and lifestyle brands."
                    href="/coworking/bia/kensington"
                    colors={colors}
                  />
                  <BIACard
                    name="Victoria Park Business Improvement Area"
                    description="Emerging district adjacent to downtown core. Mix of historic buildings and new developments. Growing food, entertainment, and professional services scene."
                    href="/coworking/bia/victoria-park"
                    colors={colors}
                  />
                </SimpleGrid>
              </Box>

              <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
                {submarketsData.map((sub) => (
                  <SubmarketCard key={sub.id} submarket={sub} basePath="/coworking" colors={colors} />
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
