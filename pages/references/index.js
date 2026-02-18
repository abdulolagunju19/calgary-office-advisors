import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import referencesData from '../../data/references.json';

const CalgaryMap = dynamic(() => import('../../components/CalgaryMap'), { ssr: false });

const CATEGORY_LABELS = {
  designers: 'Designers',
  lawFirms: 'Law Firms',
};

export default function ReferencesIndex() {
  const colors = useColors();
  const title = 'References | Calgary Office Advisors';
  const description = 'Trusted reference list of professionals involved in the lease process: designers, law firms. Guidance only—not endorsement.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="720px" px={{ base: 4, md: 8 }}>
            <VStack align="stretch" spacing={10}>
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  References
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Professionals in the Lease Process
                </Heading>
                <Text mt={4} fontSize="lg" color={colors.textMuted} lineHeight="1.7">
                  A reference list of designers, law firms, and related professionals. This section is guidance only—not endorsement.
                </Text>
              </Box>

              {/* Map */}
              <Box>
                <CalgaryMap markers={[]} markerColor="#805ad5" />
              </Box>

              {Object.entries(referencesData).map(([key, list]) => (
                <Box key={key}>
                  <Heading
                    as="h2"
                    size="lg"
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    mb={6}
                  >
                    {CATEGORY_LABELS[key] || key}
                  </Heading>
                  <VStack align="stretch" spacing={6}>
                    {list.map((item, i) => (
                      <Box
                        key={i}
                        p={6}
                        bg={colors.bgCard}
                        border="1px solid"
                        borderColor={colors.border}
                      >
                        <Text fontWeight="600" color={colors.textPrimary} fontSize="lg">
                          {item.firm}
                        </Text>
                        <Text fontSize="md" color={colors.textSecondary} mt={1}>
                          {item.specialty}
                        </Text>
                        {item.description && (
                          <Text fontSize="md" color={colors.textMuted} mt={3} lineHeight="1.6">
                            {item.description}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
