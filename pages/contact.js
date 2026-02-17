import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Flex,
  Link,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Icon,
  useToast,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { 
  FiMail, 
  FiLinkedin, 
  FiMapPin,
  FiArrowUpRight,
  FiSend,
  FiCalendar,
  FiPhone,
} from 'react-icons/fi';

import Layout from '../components/Layout';
import Section from '../components/Section';
import useColors from '../hooks/useColors';

const MotionBox = motion(Box);

const ContactInfo = ({ icon, title, children, href, isExternal = false, colors }) => (
  <HStack 
    spacing={4} 
    align="flex-start"
    p={6}
    bg={colors.bgCard}
    border="1px solid"
    borderColor={colors.border}
    transition="all 0.3s"
    _hover={{
      borderColor: 'accent.gold',
      transform: 'translateY(-2px)',
      boxShadow: 'md',
    }}
  >
    <Box p={3} bg={colors.isDark ? '#1a2830' : 'surface.cream'}>
      <Icon as={icon} boxSize={5} color="accent.gold" />
    </Box>
    <VStack align="flex-start" spacing={1}>
      <Text fontSize="xs" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.1em">
        {title}
      </Text>
      {href ? (
        <Link 
          href={href} 
          isExternal={isExternal}
          color={colors.textPrimary}
          fontWeight="500"
          fontSize="md"
          _hover={{ color: 'accent.gold' }}
        >
          {children}
        </Link>
      ) : (
        <Text color={colors.textPrimary} fontWeight="500" fontSize="md">
          {children}
        </Text>
      )}
    </VStack>
  </HStack>
);

export default function Contact() {
  const router = useRouter();
  const colors = useColors();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const website = router.query.website;
    if (website && typeof website === 'string') {
      setFormData((prev) => ({ ...prev, company: website.trim() }));
    }
  }, [router.query.website]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll be in touch soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const url = 'https://abdulolagunju.com/contact';
  const title = 'Contact | Abdul-Samad Olagunju';
  const description = 'Get in touch to discuss your commercial real estate needs. Strategic advisory, tenant representation, and technology-enabled solutions.';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ url, title, description }}
      />
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <Box pt={{ base: 32, lg: 40 }} pb={{ base: 8, lg: 16 }}>
          <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
            <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={{ base: 6, md: 10 }} alignItems="center">
              <Box>
                <Image
                  src="/images/Headshot.jpeg"
                  alt="Abdul-Samad Olagunju"
                  borderRadius="lg"
                  objectFit="cover"
                  w={{ base: '150px', md: '200px' }}
                  h={{ base: '150px', md: '200px' }}
                  boxShadow="lg"
                />
              </Box>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="accent.gold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  mb={2}
                >
                  Commercial Real Estate Advisor
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  lineHeight="1.1"
                  letterSpacing="-0.02em"
                  mb={4}
                >
                  Abdul-Samad Olagunju
                </Heading>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={colors.textMuted}
                  lineHeight="1.8"
                >
                  Whether you're navigating a complex lease negotiation, exploring 
                  new markets, or looking to optimize your portfolio, I'd love to 
                  hear about your real estate challenges.
                </Text>
              </MotionBox>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Section pt={{ base: 8, lg: 16 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1.2fr' }}
            gap={{ base: 12, lg: 20 }}
          >
            {/* Contact Info Column */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                <ContactInfo
                  icon={FiPhone}
                  title="Phone"
                  href="tel:587-432-0012"
                  isExternal
                  colors={colors}
                >
                  587-432-0012
                </ContactInfo>

                <ContactInfo
                  icon={FiMail}
                  title="Email"
                  href="mailto:aolagunju@cresa.com"
                  isExternal
                  colors={colors}
                >
                  aolagunju@cresa.com
                </ContactInfo>

                <ContactInfo
                  icon={FiLinkedin}
                  title="LinkedIn"
                  href="https://www.linkedin.com/in/abdul-samad-olagunju-727877167/"
                  isExternal
                  colors={colors}
                >
                  Connect on LinkedIn
                </ContactInfo>

                <ContactInfo
                  icon={FiMapPin}
                  title="Location"
                  colors={colors}
                >
                  Calgary, Alberta, Canada
                </ContactInfo>

                {/* Schedule Meeting CTA */}
                <Link
                  href="https://outlook.office.com/bookwithme/user/7e40e16be5ca4f0c9a36a977b9c33aa9%40cresa.com?anonymous&ismsaljsauthenabled=true"
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    p={8}
                    bg={colors.isDark ? 'accent.gold' : 'navy.800'}
                    position="relative"
                    overflow="hidden"
                    transition="all 0.3s"
                    role="group"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl',
                      bg: colors.isDark ? '#d4ac2b' : 'navy.900',
                    }}
                  >
                    <VStack align="flex-start" spacing={4}>
                      <Icon 
                        as={FiCalendar} 
                        boxSize={8} 
                        color={colors.isDark ? 'navy.900' : 'accent.gold'} 
                      />
                      <Heading
                        as="h3"
                        fontSize="xl"
                        fontFamily="heading"
                        fontWeight="400"
                        color={colors.isDark ? 'navy.900' : 'white'}
                      >
                        Schedule a Meeting
                      </Heading>
                      <Text 
                        fontSize="sm" 
                        color={colors.isDark ? 'navy.700' : 'whiteAlpha.800'}
                      >
                        Prefer to schedule time directly? Book a consultation 
                        to discuss your commercial real estate needs.
                      </Text>
                      <HStack
                        spacing={2}
                        color={colors.isDark ? 'white' : 'navy.900'}
                        fontSize="sm"
                        fontWeight="600"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        bg={colors.isDark ? 'navy.800' : 'accent.gold'}
                        px={4}
                        py={2}
                        transition="all 0.2s"
                        _groupHover={{ 
                          bg: colors.isDark ? 'navy.900' : '#d4ac2b' 
                        }}
                      >
                        <Text>Book a Time</Text>
                        <FiArrowUpRight />
                      </HStack>
                    </VStack>
                    {/* Decorative Element */}
                    <Box
                      position="absolute"
                      top="-30px"
                      right="-30px"
                      w="100px"
                      h="100px"
                      border="2px solid"
                      borderColor={colors.isDark ? 'navy.600' : 'whiteAlpha.200'}
                      borderRadius="full"
                    />
                  </Box>
                </Link>
              </VStack>
            </GridItem>

            {/* Contact Form Column */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  as="form"
                  onSubmit={handleSubmit}
                  p={{ base: 6, md: 10 }}
                  bg={colors.bgCard}
                  border="1px solid"
                  borderColor={colors.border}
                >
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading
                        as="h2"
                        fontSize="2xl"
                        fontFamily="heading"
                        fontWeight="400"
                        color={colors.textPrimary}
                        mb={2}
                      >
                        Send a Message
                      </Heading>
                      <Text fontSize="sm" color={colors.textMuted}>
                        Fill out the form below and I'll get back to you promptly.
                      </Text>
                    </Box>

                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
                          Name
                        </FormLabel>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          bg={colors.bg}
                          borderColor={colors.border}
                          color={colors.textPrimary}
                          _hover={{ borderColor: colors.borderHover }}
                          _focus={{ borderColor: 'accent.gold', boxShadow: 'none' }}
                          _placeholder={{ color: colors.textSubtle }}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
                          Email
                        </FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          bg={colors.bg}
                          borderColor={colors.border}
                          color={colors.textPrimary}
                          _hover={{ borderColor: colors.borderHover }}
                          _focus={{ borderColor: 'accent.gold', boxShadow: 'none' }}
                          _placeholder={{ color: colors.textSubtle }}
                        />
                      </FormControl>
                    </Grid>

                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
                        Company
                      </FormLabel>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        bg={colors.bg}
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _hover={{ borderColor: colors.borderHover }}
                        _focus={{ borderColor: 'accent.gold', boxShadow: 'none' }}
                        _placeholder={{ color: colors.textSubtle }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="500" color={colors.textSecondary}>
                        Message
                      </FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your real estate needs..."
                        rows={6}
                        bg={colors.bg}
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _hover={{ borderColor: colors.borderHover }}
                        _focus={{ borderColor: 'accent.gold', boxShadow: 'none' }}
                        _placeholder={{ color: colors.textSubtle }}
                        resize="vertical"
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      bg={colors.btnPrimaryBg}
                      color={colors.btnPrimaryColor}
                      size="lg"
                      h="56px"
                      fontSize="sm"
                      fontWeight="500"
                      letterSpacing="0.05em"
                      textTransform="uppercase"
                      rightIcon={<FiSend />}
                      _hover={{
                        bg: colors.btnPrimaryHoverBg,
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.3s"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Section>

        {/* Newsletter Section */}
        <Section bg={colors.bgAlt}>
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            maxW="600px"
            mx="auto"
          >
            <Text
              fontSize="xs"
              fontWeight="600"
              color="accent.gold"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={4}
            >
              Stay Connected
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontFamily="heading"
              fontWeight="400"
              color={colors.textPrimary}
              mb={4}
            >
              Subscribe to the Newsletter
            </Heading>
            <Text fontSize="md" color={colors.textMuted} mb={8}>
              Get periodic insights on commercial real estate trends, market 
              analysis, and strategic perspectives delivered to your inbox.
            </Text>
            <Link
              href="https://preview.mailerlite.io/forms/1951668/175148894369350926/share"
              isExternal
            >
              <Button
                size="lg"
                bg={colors.btnPrimaryBg}
                color={colors.btnPrimaryColor}
                px={10}
                h="56px"
                fontSize="sm"
                fontWeight="500"
                letterSpacing="0.05em"
                textTransform="uppercase"
                rightIcon={<FiArrowUpRight />}
                _hover={{
                  bg: colors.btnPrimaryHoverBg,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s"
              >
                Subscribe Now
              </Button>
            </Link>
          </Flex>
        </Section>
      </Layout>
    </>
  );
}
