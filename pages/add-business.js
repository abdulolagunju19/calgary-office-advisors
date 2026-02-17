import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  useColorMode,
  useToast,
  List,
  ListItem,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import useColors from '../hooks/useColors';

export default function AddBusiness() {
  const router = useRouter();
  const colors = useColors();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const toast = useToast();

  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [businessUrl, setBusinessUrl] = useState('');
  const [isHiring, setIsHiring] = useState(false);
  const [hiringLink, setHiringLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressRef = useRef(null);
  const debounceRef = useRef(null);

  // Get the URL from query params if passed
  useEffect(() => {
    if (router.query.url) {
      setBusinessUrl(router.query.url);
    }
  }, [router.query.url]);

  // Address autocomplete
  const searchAddress = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Calgary')}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setAddressSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.log('Address search error');
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setBusinessAddress(value);
    
    // Debounce the search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchAddress(value);
    }, 300);
  };

  const selectAddress = (suggestion) => {
    const addr = suggestion.address;
    let formattedAddress = '';
    if (addr.house_number && addr.road) {
      formattedAddress = `${addr.house_number} ${addr.road}`;
    } else if (addr.road) {
      formattedAddress = addr.road;
    }
    if (addr.city || addr.town || addr.village) {
      formattedAddress += `, ${addr.city || addr.town || addr.village}`;
    }
    if (addr.state) {
      formattedAddress += `, ${addr.state}`;
    }
    setBusinessAddress(formattedAddress || suggestion.display_name);
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addressRef.current && !addressRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!businessName.trim() || !businessAddress.trim()) {
      toast({
        title: 'Please fill in required fields',
        description: 'Business name and address are required.',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          address: businessAddress,
          website: businessUrl,
          phone: phone,
          isHiring: isHiring,
          hiringLink: hiringLink,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Business added successfully!',
          description: 'Redirecting to the business directory...',
          status: 'success',
          duration: 2000,
        });
        // Redirect to companies page
        setTimeout(() => {
          router.push('/insights');
        }, 1500);
      } else {
        throw new Error('Failed to add business');
      }
    } catch (error) {
      toast({
        title: 'Error adding business',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = 'Add Your Business | Calgary Office Advisors';
  const description = 'Add your business to the Calgary Business Directory.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="600px" px={{ base: 4, md: 8 }}>
            <VStack align="stretch" spacing={8}>
              <Box textAlign="center">
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  mb={4}
                >
                  Add Your Business
                </Heading>
                <Text fontSize="lg" color={colors.textMuted} maxW="480px" mx="auto">
                  Join the Calgary Business Directory and connect with other local businesses.
                </Text>
              </Box>

              <Box
                as="form"
                onSubmit={handleSubmit}
                p={{ base: 6, md: 10 }}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="xl"
              >
                <VStack spacing={5} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color={colors.textPrimary} fontWeight="600">
                      Name of Business
                    </FormLabel>
                    <Input
                      placeholder="e.g., Acme Corporation"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      bg={colors.bg}
                      border="2px solid"
                      borderColor={colors.border}
                      color={colors.textPrimary}
                      h="54px"
                      _placeholder={{ color: colors.textMuted }}
                      _hover={{ borderColor: colors.borderHover }}
                      _focus={{
                        borderColor: 'accent.gold',
                        boxShadow: '0 0 0 2px rgba(201, 162, 39, 0.3)',
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color={colors.textPrimary} fontWeight="600">
                      Address of Business
                    </FormLabel>
                    <Box position="relative" ref={addressRef}>
                      <Input
                        placeholder="Start typing an address..."
                        value={businessAddress}
                        onChange={handleAddressChange}
                        onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                        bg={colors.bg}
                        border="2px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        h="54px"
                        _placeholder={{ color: colors.textMuted }}
                        _hover={{ borderColor: colors.borderHover }}
                        _focus={{
                          borderColor: 'accent.gold',
                          boxShadow: '0 0 0 2px rgba(201, 162, 39, 0.3)',
                        }}
                      />
                      {showSuggestions && addressSuggestions.length > 0 && (
                        <List
                          position="absolute"
                          top="100%"
                          left={0}
                          right={0}
                          bg={colors.bgCard}
                          border="1px solid"
                          borderColor={colors.border}
                          borderRadius="md"
                          boxShadow="lg"
                          zIndex={10}
                          maxH="200px"
                          overflowY="auto"
                        >
                          {addressSuggestions.map((suggestion, index) => (
                            <ListItem
                              key={index}
                              px={4}
                              py={3}
                              cursor="pointer"
                              _hover={{ bg: colors.bgHover }}
                              onClick={() => selectAddress(suggestion)}
                              color={colors.textPrimary}
                              fontSize="sm"
                              borderBottom="1px solid"
                              borderColor={colors.border}
                            >
                              {suggestion.display_name}
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Box>
                  </FormControl>

                  <FormControl>
                    <FormLabel color={colors.textPrimary} fontWeight="600">
                      Phone Number
                    </FormLabel>
                    <Input
                      type="tel"
                      placeholder="e.g., (403) 555-1234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      bg={colors.bg}
                      border="2px solid"
                      borderColor={colors.border}
                      color={colors.textPrimary}
                      h="54px"
                      _placeholder={{ color: colors.textMuted }}
                      _hover={{ borderColor: colors.borderHover }}
                      _focus={{
                        borderColor: 'accent.gold',
                        boxShadow: '0 0 0 2px rgba(201, 162, 39, 0.3)',
                      }}
                    />
                  </FormControl>

                  {businessUrl && (
                    <FormControl>
                      <FormLabel color={colors.textPrimary} fontWeight="600">
                        Business Website
                      </FormLabel>
                      <Input
                        type="url"
                        value={businessUrl}
                        onChange={(e) => setBusinessUrl(e.target.value)}
                        bg={colors.bg}
                        border="2px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        h="54px"
                        _placeholder={{ color: colors.textMuted }}
                        _hover={{ borderColor: colors.borderHover }}
                        _focus={{
                          borderColor: 'accent.gold',
                          boxShadow: '0 0 0 2px rgba(201, 162, 39, 0.3)',
                        }}
                      />
                    </FormControl>
                  )}

                  <FormControl>
                    <Checkbox
                      isChecked={isHiring}
                      onChange={(e) => setIsHiring(e.target.checked)}
                      colorScheme="yellow"
                      size="lg"
                    >
                      <Text color={colors.textPrimary} fontWeight="600">
                        Actively Hiring
                      </Text>
                    </Checkbox>
                  </FormControl>

                  {isHiring && (
                    <FormControl>
                      <FormLabel color={colors.textPrimary} fontWeight="600">
                        Hiring/Careers Link (optional)
                      </FormLabel>
                      <Input
                        type="url"
                        placeholder="e.g., https://yourcompany.com/careers"
                        value={hiringLink}
                        onChange={(e) => setHiringLink(e.target.value)}
                        bg={colors.bg}
                        border="2px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        h="54px"
                        _placeholder={{ color: colors.textMuted }}
                        _hover={{ borderColor: colors.borderHover }}
                        _focus={{
                          borderColor: 'accent.gold',
                          boxShadow: '0 0 0 2px rgba(201, 162, 39, 0.3)',
                        }}
                      />
                    </FormControl>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    bg="accent.gold"
                    color="navy.900"
                    fontWeight="600"
                    h="56px"
                    w="100%"
                    mt={4}
                    isLoading={isSubmitting}
                    loadingText="Adding Business..."
                    _hover={{
                      bg: '#d4ac2b',
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    Add My Business
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
