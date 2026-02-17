import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Input,
  Button,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import { FiPhone, FiMail } from 'react-icons/fi';
import useColors from '../hooks/useColors';

const DealCard = ({ deal, colors, isDark }) => (
  <Box
    p={6}
    bg={isDark ? 'whiteAlpha.12' : 'white'}
    border="1px solid"
    borderColor={isDark ? 'whiteAlpha.22' : 'navy.200'}
    borderRadius="lg"
    transition="all 0.25s"
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: 'xl',
      borderColor: isDark ? 'whiteAlpha.35' : 'navy.300',
    }}
  >
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between" align="start">
        <Badge
          colorScheme={deal.class === 'A' ? 'green' : deal.class === 'B' ? 'blue' : 'purple'}
          fontSize="xs"
          fontWeight="600"
          letterSpacing="0.05em"
        >
          CLASS {deal.class}
        </Badge>
        {deal.featured && (
          <Badge colorScheme="yellow" fontSize="xs" fontWeight="600">
            EXCLUSIVE
          </Badge>
        )}
      </HStack>
      
      <Box>
        <Text
          fontSize="xl"
          fontWeight="700"
          color={colors.textPrimary}
          mb={1}
        >
          {deal.tenant}
        </Text>
        <Text fontSize="md" color={colors.textSecondary} mb={1}>
          {deal.building}
        </Text>
        <Text fontSize="sm" color={colors.textSubtle}>
          {deal.area}
        </Text>
      </Box>

      <HStack spacing={4} justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color={colors.textMuted} fontWeight="600">
            LEASE SIZE
          </Text>
          <Text fontSize="lg" fontWeight="700" color={colors.textPrimary}>
            {deal.sqft.toLocaleString()} ft²
          </Text>
        </VStack>
        {deal.price && (
          <VStack align="end" spacing={1}>
            <Text fontSize="xs" color={colors.textMuted} fontWeight="600">
              RATE
            </Text>
            <Text fontSize="lg" fontWeight="700" color={deal.featured ? 'accent.gold' : colors.textPrimary}>
              ${deal.price}/RSF
            </Text>
          </VStack>
        )}
      </HStack>

      {deal.highlight && (
        <Text fontSize="sm" color={colors.textMuted} fontStyle="italic">
          {deal.highlight}
        </Text>
      )}
    </VStack>
  </Box>
);

export default function DealsOfTheQuarter({ deals: customDeals }) {
  const colors = useColors();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const defaultDeals = [
    {
      id: 1,
      tenant: 'Alberta Treasury Branches',
      building: 'Suncor Energy Centre',
      area: 'Downtown Core',
      class: 'AA',
      sqft: 173000,
      price: '',
      featured: true,
      highlight: 'Relocation',
    },
    {
      id: 2,
      tenant: 'Tourmaline Oil Corp',
      building: 'Bow Valley Square III',
      area: 'Downtown Core',
      class: 'A',
      sqft: 32000,
      price: '',
      featured: false,
    },
    {
      id: 3,
      tenant: 'Bennett Jones LLP',
      building: 'Bankers Hall',
      area: 'Downtown Core',
      class: 'A',
      sqft: 15000,
      price: 38,
      featured: true,
      highlight: '10-year renewal with expansion',
    },
    {
      id: 4,
      tenant: 'Telus Communications',
      building: 'Quarry Park',
      area: 'Suburban South',
      class: 'B',
      sqft: 5500,
      price: 22,
      featured: false,
    },
    {
      id: 5,
      tenant: 'Pixel Union',
      building: 'Kensington Yards',
      area: 'Beltline',
      class: 'B',
      sqft: 3200,
      price: 28,
      featured: false,
    },
    {
      id: 6,
      tenant: 'Neo Financial',
      building: 'Deerfoot City',
      area: 'Suburban North',
      class: 'C',
      sqft: 4800,
      price: 18,
      featured: false,
    },
  ];

  const deals = customDeals || defaultDeals;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && firstName.trim() && lastName.trim()) {
      console.log('Form submitted:', { firstName, lastName, email });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFirstName('');
        setLastName('');
        setEmail('');
      }, 3000);
    }
  };

  return (
    <Box
      bg={isDark ? 'navy.900' : 'navy.50'}
      py={{ base: 12, md: 14 }}
      position="relative"
    >
      {/* Background accent */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        width="40%"
        height="140%"
        bg={isDark ? 'rgba(201, 162, 39, 0.05)' : 'rgba(201, 162, 39, 0.08)'}
        borderRadius="full"
        filter="blur(100px)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <VStack align="stretch" spacing={12}>
          {/* Header */}
          <Box textAlign="center">
            <Badge
              colorScheme="yellow"
              fontSize="xs"
              fontWeight="600"
              letterSpacing="0.1em"
              mb={4}
              px={3}
              py={1}
            >
              INSIDER ACCESS
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '2.5rem', md: '3.5rem' }}
              fontFamily="heading"
              fontWeight="400"
              color={colors.textPrimary}
              lineHeight="1.12"
              letterSpacing="-0.025em"
              mb={4}
            >
              Calgary Office Deals of the Quarter
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={colors.textSecondary}
              lineHeight="1.7"
              maxW="720px"
              mx="auto"
            >
              Recent lease transactions from Calgary's top buildings. Market intelligence updated quarterly.
            </Text>
          </Box>

          {/* Deals Grid */}
          <Box position="relative" overflow="hidden">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {deals.slice(0, 2).map((deal) => (
                <DealCard key={deal.id} deal={deal} colors={colors} isDark={isDark} />
              ))}
              {/* Blurred/faded deals */}
              {deals.slice(2).map((deal) => (
                <Box key={deal.id} filter="blur(6px)" opacity={0.5} pointerEvents="none" overflow="hidden">
                  <DealCard deal={deal} colors={colors} isDark={isDark} />
                </Box>
              ))}
            </SimpleGrid>
            
            {/* Subscribe overlay */}
            {deals.length > 2 && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="70%"
                bgGradient={isDark 
                  ? 'linear(to-t, navy.900 0%, navy.900 30%, transparent 100%)' 
                  : 'linear(to-t, navy.50 0%, navy.50 30%, transparent 100%)'
                }
                display="flex"
                alignItems="flex-end"
                justifyContent="center"
                pb={8}
              >
                <VStack spacing={3}>
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    color={colors.textPrimary}
                  >
                    Sign up to see all deals
                  </Text>
                  <Button
                    size="lg"
                    bg="accent.gold"
                    color="navy.900"
                    fontWeight="600"
                    _hover={{ bg: 'accent.goldHover', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                    onClick={() => {
                      document.getElementById('deals-email-capture')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    Get Full Access →
                  </Button>
                </VStack>
              </Box>
            )}
          </Box>

          {/* Email Capture Section */}
          <Box
            id="deals-email-capture"
            bg={isDark ? 'whiteAlpha.15' : 'white'}
            border="1px solid"
            borderColor={isDark ? 'whiteAlpha.25' : 'navy.200'}
            borderRadius="xl"
            p={{ base: 8, md: 10 }}
            textAlign="center"
            scrollMarginTop="120px"
          >
            <Heading
              as="h3"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="600"
              color={colors.textPrimary}
              mb={3}
            >
              Get Next Quarter's Deals First
            </Heading>
            <Text
              fontSize="md"
              color={colors.textSecondary}
              mb={6}
              maxW="560px"
              mx="auto"
            >
              Join Calgary's top decision-makers. Receive exclusive information before it hits the market.
            </Text>

             {!submitted ? (
              <Box as="form" onSubmit={handleSubmit} maxW="540px" mx="auto">
                <VStack spacing={3}>
                  <HStack spacing={3} w="100%" flexDirection={{ base: 'column', sm: 'row' }}>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      bg={isDark ? 'white' : colors.bg}
                      border="2px solid"
                      borderColor={isDark ? 'whiteAlpha.4' : colors.border}
                      color={isDark ? 'navy.900' : colors.textPrimary}
                      fontSize="md"
                      h="54px"
                      flex={1}
                      _placeholder={{ color: isDark ? 'navy.400' : colors.textMuted }}
                      _hover={{ borderColor: isDark ? 'whiteAlpha.6' : colors.borderHover }}
                      _focus={{
                        borderColor: isDark ? 'white' : colors.accent,
                        boxShadow: isDark ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 0 0 2px rgba(201, 162, 39, 0.3)',
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      bg={isDark ? 'white' : colors.bg}
                      border="2px solid"
                      borderColor={isDark ? 'whiteAlpha.4' : colors.border}
                      color={isDark ? 'navy.900' : colors.textPrimary}
                      fontSize="md"
                      h="54px"
                      flex={1}
                      _placeholder={{ color: isDark ? 'navy.400' : colors.textMuted }}
                      _hover={{ borderColor: isDark ? 'whiteAlpha.6' : colors.borderHover }}
                      _focus={{
                        borderColor: isDark ? 'white' : colors.accent,
                        boxShadow: isDark ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 0 0 2px rgba(201, 162, 39, 0.3)',
                      }}
                    />
                  </HStack>
                  <HStack spacing={3} w="100%" flexDirection={{ base: 'column', sm: 'row' }}>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg={isDark ? 'white' : colors.bg}
                      border="2px solid"
                      borderColor={isDark ? 'whiteAlpha.4' : colors.border}
                      color={isDark ? 'navy.900' : colors.textPrimary}
                      fontSize="md"
                      h="54px"
                      flex={1}
                      _placeholder={{ color: isDark ? 'navy.400' : colors.textMuted }}
                      _hover={{ borderColor: isDark ? 'whiteAlpha.6' : colors.borderHover }}
                      _focus={{
                        borderColor: isDark ? 'white' : colors.accent,
                        boxShadow: isDark ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 0 0 2px rgba(201, 162, 39, 0.3)',
                      }}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      bg="accent.gold"
                      color="navy.900"
                      fontWeight="600"
                      h="54px"
                      px={8}
                      fontSize="md"
                      leftIcon={<FiMail />}
                      _hover={{
                        bg: isDark ? 'white' : '#d4ac2b',
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      flexShrink={0}
                      transition="all 0.2s"
                    >
                      Get Deals
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ) : (
              <Text fontSize="lg" fontWeight="600" color="accent.gold">
                ✓ Success! Check your email for confirmation.
              </Text>
            )}

            {/* Secondary CTA */}
            <Box mt={8} pt={6} borderTop="1px solid" borderColor={isDark ? 'whiteAlpha.15' : colors.border}>
              <Text fontSize="sm" color={colors.textMuted} mb={4}>
                Looking to move or for current market intelligence?
              </Text>
              <NextLink href="/contact" passHref legacyBehavior>
                <Button
                  as="a"
                  size="md"
                  variant="outline"
                  borderColor={isDark ? 'whiteAlpha.4' : colors.border}
                  borderWidth="2px"
                  color={colors.textPrimary}
                  leftIcon={<FiPhone />}
                  _hover={{
                    bg: isDark ? 'whiteAlpha.12' : colors.bgHover,
                    borderColor: isDark ? 'whiteAlpha.6' : colors.borderHover,
                  }}
                >
                  Call Now to Learn More
                </Button>
              </NextLink>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
