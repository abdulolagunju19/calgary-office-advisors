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

export default function CoworkingIndex() {
  const colors = useColors();
  const title = 'Coworking | Calgary Office Advisors';
  const description = 'Browse coworking spaces by Calgary submarket. A curated list for reference.';

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
