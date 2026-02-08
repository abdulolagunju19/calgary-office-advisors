import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import SubmarketCard from '../../components/SubmarketCard';
import submarketsData from '../../data/submarkets.json';

export default function BuildingsIndex() {
  const colors = useColors();
  const title = 'Buildings | Calgary Office Advisors';
  const description = 'Browse office buildings by Calgary submarket. Informational directory—not a vacancy search.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
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
