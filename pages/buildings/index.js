import Head from 'next/head';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Badge,
  Link,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import SubmarketCard from '../../components/SubmarketCard';
import submarketsData from '../../data/submarkets.json';
import buildingsData from '../../data/buildings.json';

const CalgaryMap = dynamic(() => import('../../components/CalgaryMap'), { ssr: false });

const propertyTypes = [
  { id: 'all', label: 'All Properties', slug: 'all' },
  { id: 'medical', label: 'Medical Space', slug: 'medical-space' },
  { id: 'dental', label: 'Dental Space', slug: 'dental-space' },
  { id: 'lab', label: 'Lab Space', slug: 'lab-space' },
  { id: 'artist', label: 'Artist Studio', slug: 'artist-studio-space' },
  { id: 'fitness', label: 'Fitness Centre', slug: 'fitness-centre-space' },
  { id: 'instructional', label: 'Instructional Facility', slug: 'instructional-facility-space' },
  { id: 'recreational', label: 'Recreational Facility', slug: 'recreational-facility-space' },
];

const filterContent = {
  'medical-space': {
    title: 'Medical Office Space in Calgary',
    description: 'Find medical office space in Calgary\'s leading healthcare districts. Class A buildings with specialized infrastructure for medical practices, clinics, and healthcare providers.',
    bullets: [
      'Specialized HVAC and plumbing for medical use',
      'Ground floor access and ample parking',
      'Close proximity to hospitals and healthcare networks',
    ],
  },
  'dental-space': {
    title: 'Dental Office Space in Calgary',
    description: 'Purpose-built dental suites in Calgary with the infrastructure dental practices need. High-traffic locations with excellent visibility and patient access.',
    bullets: [
      'Enhanced plumbing and electrical systems',
      'High-visibility retail-like exposure',
      'Patient-friendly accessibility and parking',
    ],
  },
  'lab-space': {
    title: 'Laboratory Space in Calgary',
    description: 'Laboratory spaces designed for research, testing, and specialized scientific work. Heavy infrastructure, controlled environments, and safety-compliant facilities.',
    bullets: [
      'Advanced electrical and HVAC systems',
      'Safety and compliance-ready infrastructure',
      'Proximity to research districts and universities',
    ],
  },
  'artist-studio-space': {
    title: 'Artist Studio Space in Calgary',
    description: 'Creative work spaces in Calgary\'s emerging arts districts. High ceilings, natural light, and affordable rates for individual artists and collectives.',
    bullets: [
      'Open floor plans with high ceilings',
      'Creative-friendly neighborhoods',
      'Affordable rates and flexible terms',
    ],
  },
  'fitness-centre-space': {
    title: 'Fitness Centre Space in Calgary',
    description: 'Ground floor retail locations with heavy foot traffic, reinforced flooring, and infrastructure for gyms, studios, and wellness centers.',
    bullets: [
      'Ground floor visibility and access',
      'Reinforced flooring and enhanced HVAC',
      'High-traffic retail corridors',
    ],
  },
  'instructional-facility-space': {
    title: 'Instructional Facility Space in Calgary',
    description: 'Classroom and training spaces for education providers, tutoring centers, and professional development organizations.',
    bullets: [
      'Flexible layouts for classrooms and offices',
      'Proximity to schools and transit',
      'Family-friendly neighborhoods',
    ],
  },
  'recreational-facility-space': {
    title: 'Recreational Facility Space in Calgary',
    description: 'Large-format spaces for sports, events, and community programming. High ceilings, open floor plans, and accessible locations.',
    bullets: [
      'Large open floor plans',
      'Ample parking and transit access',
      'Community-oriented locations',
    ],
  },
};

export default function BuildingsIndex() {
  const colors = useColors();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const typeParam = router.query.type;
    if (typeParam && propertyTypes.some((t) => t.slug === typeParam)) {
      setActiveFilter(typeParam);
    } else {
      setActiveFilter('all');
    }
  }, [router.query.type]);

  const handleFilterClick = (slug) => {
    if (slug === 'all') {
      router.push('/buildings', undefined, { shallow: true });
    } else {
      router.push(`/buildings?type=${slug}`, undefined, { shallow: true });
    }
  };

  const title = 'Buildings | Calgary Office Advisors';
  const description = 'Browse office buildings by Calgary submarket. Informational directory—not a vacancy search.';

  const currentFilterContent = activeFilter !== 'all' ? filterContent[activeFilter] : null;

  return (
    <>
      <NextSeo title={title} description={description}
        openGraph={{
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/buildings`,
          images: [
            {
              url: buildingsData[0]?.image || '/images/Headshot.jfif',
              width: 800,
              height: 600,
              alt: buildingsData[0]?.name || 'Calgary Office Advisors',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/buildings`}
      />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/buildings`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/buildings`,
          image: buildingsData[0]?.image || '/images/Headshot.jfif',
          mainEntity: buildingsData.map(b => ({
            '@type': 'Place',
            name: b.name,
            address: b.address,
            geo: { '@type': 'GeoCoordinates', latitude: b.lat, longitude: b.lng },
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calgaryofficeadvisors.ca'}/buildings/${b.id}`,
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
                  Buildings
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
                  Select a submarket to see office buildings in that area. Informational only—not a vacancy search.
                </Text>
              </Box>

              {/* Map */}
              <Box>
                <CalgaryMap markers={buildingsData} markerColor="#2c5282" />
              </Box>

              {/* All Buildings */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {buildingsData.map((building) => (
                  <NextLink key={building.id} href={`/buildings/${building.id}`} passHref legacyBehavior>
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
                        {building.name}
                      </Text>
                      <Text fontSize="sm" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.05em" mt={1}>
                        {building.submarket}
                      </Text>
                      <Text fontSize="md" color={colors.textMuted} mt={2} lineHeight="1.5">
                        {building.address}
                      </Text>
                      <Text fontSize="md" color={colors.textSecondary} mt={2} fontWeight="500">
                        View details →
                      </Text>
                    </Link>
                  </NextLink>
                ))}
              </SimpleGrid>

              {/* Calculator Link */}
              <Box textAlign="center" py={6} bg={colors.bgCard} borderRadius="lg" border="1px solid" borderColor={colors.border}>
                <Text fontSize="md" fontWeight="600" color={colors.textPrimary} mb={3}>
                  Need help calculating your space requirements?
                </Text>
                <NextLink href="/buildings/calculator" passHref legacyBehavior>
                  <Button
                    as="a"
                    size="md"
                    bg={colors.accent}
                    color="white"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    Office Space Calculator →
                  </Button>
                </NextLink>
              </Box>

              {/* Property Type Filters */}
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  mb={4}
                >
                  Property Type
                </Text>
                <HStack spacing={3} flexWrap="wrap">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type.id}
                      size="sm"
                      variant={activeFilter === type.slug ? 'solid' : 'outline'}
                      onClick={() => handleFilterClick(type.slug)}
                      bg={activeFilter === type.slug ? colors.accent : 'transparent'}
                      color={activeFilter === type.slug ? 'white' : colors.textPrimary}
                      borderColor={colors.border}
                      _hover={{
                        bg: activeFilter === type.slug ? colors.accent : colors.bgHover,
                      }}
                    >
                      {type.label}
                    </Button>
                  ))}
                </HStack>
              </Box>

              {/* Filter Content Block */}
              {currentFilterContent && (
                <Box
                  p={6}
                  bg={colors.bgCard}
                  border="1px solid"
                  borderColor={colors.border}
                  borderRadius="lg"
                >
                  <Badge colorScheme="blue" fontSize="xs" mb={3}>
                    SPECIALIZED SPACE
                  </Badge>
                  <Heading
                    as="h2"
                    fontSize="2xl"
                    fontWeight="600"
                    color={colors.textPrimary}
                    mb={3}
                  >
                    {currentFilterContent.title}
                  </Heading>
                  <Text fontSize="md" color={colors.textMuted} lineHeight="1.7" mb={4}>
                    {currentFilterContent.description}
                  </Text>
                  <VStack align="start" spacing={2}>
                    {currentFilterContent.bullets.map((bullet, idx) => (
                      <HStack key={idx} align="start" spacing={2}>
                        <Text color={colors.accent}>•</Text>
                        <Text fontSize="sm" color={colors.textMuted}>
                          {bullet}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                  <Box mt={5} pt={5} borderTop="1px solid" borderColor={colors.border}>
                    <Text fontSize="sm" color={colors.textMuted} mb={2}>
                      Related areas:{' '}
                      <NextLink href="/buildings/submarket/downtown-core" passHref legacyBehavior>
                        <Link color={colors.accent}>Downtown Core</Link>
                      </NextLink>
                      {', '}
                      <NextLink href="/buildings/submarket/beltline" passHref legacyBehavior>
                        <Link color={colors.accent}>Beltline</Link>
                      </NextLink>
                      {', '}
                      <NextLink href="/buildings/submarket/suburban-south" passHref legacyBehavior>
                        <Link color={colors.accent}>Suburban South</Link>
                      </NextLink>
                    </Text>
                  </Box>
                </Box>
              )}

              <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
                {submarketsData.map((sub) => (
                  <SubmarketCard key={sub.id} submarket={sub} basePath="/buildings" colors={colors} />
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
