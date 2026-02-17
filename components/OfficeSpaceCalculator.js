import React, { useState, useMemo } from 'react';
import Image from 'next/image';
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
  Divider,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
import useColors from '../hooks/useColors';

const floorplanImages = {
  'CEO / Director': '/images/office-floor-plan-20x15-floor-plan.jpg',
  'Partner Office': '/images/cozy-home-office-design-floor-plan-15x15.jpg',
  'Standard Office': '/images/office-floor-plan-15x10-floor-plan.jpg',
  'Small Office': '/images/office-floor-plan-12x10-floor-plan.jpg',
  'Efficient Office': '/images/office-floor-plan-10x10-floor-plan.jpg',
  // Conference rooms (all use the same image)
  'Large Boardroom (16–20 seats)': '/images/office-floor-plan-20x15-floor-plan.jpg',
  'Conference Room (8–10 seats)': '/images/office-floor-plan-20x15-floor-plan.jpg',
  'Small Meeting Room (6–8 seats)': '/images/office-floor-plan-20x15-floor-plan.jpg',
  'Break Out Room (4–6 seats)': '/images/office-floor-plan-20x15-floor-plan.jpg',
  // Workstations (all use the same image)
  'Supervisor Workstation': '/images/small-office-floor-plan-floor-plan.jpg',
  'Standard Cubicle': '/images/small-office-floor-plan-floor-plan.jpg',
  'Small Cubicle': '/images/small-office-floor-plan-floor-plan.jpg',
  // Other Areas (reception, kitchen, etc. all use the same image)
  'Large Reception': '/images/reception_kitchen.jpg',
  'Regular Reception': '/images/reception_kitchen.jpg',
  'Lunch Room (15–20 seats)': '/images/reception_kitchen.jpg',
  'Small Lunch Room (6–8 seats)': '/images/reception_kitchen.jpg',
  'Server Room': '/images/reception_kitchen.jpg',
  'Coffee Bar': '/images/reception_kitchen.jpg',
};

const SpaceInput = ({ label, dimensions, value, onChange, colors }) => (
  <Box
    p={5}
    bg={colors.bgCard}
    border="1px solid"
    borderColor={colors.border}
    borderRadius="md"
    transition="all 0.2s"
    _hover={{ borderColor: colors.borderHover }}
  >
    <VStack align="stretch" spacing={3}>
      <Text fontWeight="600" fontSize="md" color={colors.textPrimary}>
        {label}
      </Text>
      <Text fontSize="sm" color={colors.textSubtle}>
        {dimensions}
      </Text>
      {floorplanImages[label] && (
        <Box mb={2}>
          <Image
            src={floorplanImages[label]}
            alt={`${label} floorplan`}
            width={180}
            height={120}
            style={{ borderRadius: '8px', border: `1px solid ${colors.border}` }}
          />
        </Box>
      )}
      <HStack>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange(Math.max(0, value - 1))}
          borderColor={colors.border}
          color={colors.textPrimary}
          _hover={{ bg: colors.bgHover }}
        >
          −
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          textAlign="center"
          fontWeight="600"
          fontSize="lg"
          borderColor={colors.border}
          _focus={{ borderColor: colors.borderHover }}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange(value + 1)}
          borderColor={colors.border}
          color={colors.textPrimary}
          _hover={{ bg: colors.bgHover }}
        >
          +
        </Button>
      </HStack>
    </VStack>
  </Box>
);

const ResultCard = ({ label, value, unit, highlight, colors }) => (
  <Box
    p={5}
    bg={highlight ? colors.accentBg : colors.bgCard}
    border="2px solid"
    borderColor={highlight ? colors.accentBorder : colors.border}
    borderRadius="md"
  >
    <Text
      fontSize="sm"
      fontWeight="600"
      color={colors.textSubtle}
      letterSpacing="0.05em"
      textTransform="uppercase"
      mb={2}
    >
      {label}
    </Text>
    <Text
      fontSize="2xl"
      fontWeight="700"
      color={highlight ? colors.accent : colors.textPrimary}
    >
      {value} {unit}
    </Text>
  </Box>
);

export default function OfficeSpaceCalculator() {
  const colors = useColors();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [spaces, setSpaces] = useState({
    ceoOffice: 0,
    partnerOffice: 0,
    standardOffice: 0,
    smallOffice: 0,
    efficientOffice: 0,
    supervisorWorkstation: 0,
    standardCubicle: 0,
    smallCubicle: 0,
    largeBoardroom: 0,
    conferenceRoom: 0,
    smallMeetingRoom: 0,
    breakoutRoom: 0,
    largeReception: 0,
    regularReception: 0,
    lunchRoom: 0,
    smallLunchRoom: 0,
    serverRoom: 0,
    coffeeBar: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    areas: [],
    amenities: [],
  });

  const spaceDefinitions = {
    ceoOffice: { label: 'CEO / Director', dimensions: '20 × 15', sqft: 300 },
    partnerOffice: { label: 'Partner Office', dimensions: '15×15', sqft: 225 },
    standardOffice: { label: 'Standard Office', dimensions: '15×10', sqft: 150 },
    smallOffice: { label: 'Small Office', dimensions: '12 × 10', sqft: 120 },
    efficientOffice: { label: 'Efficient Office', dimensions: '10×10', sqft: 100 },
    supervisorWorkstation: { label: 'Supervisor Workstation', dimensions: '11 × 10', sqft: 110 },
    standardCubicle: { label: 'Standard Cubicle', dimensions: '6 × 8', sqft: 48 },
    smallCubicle: { label: 'Small Cubicle', dimensions: '6 × 6', sqft: 36 },
    largeBoardroom: { label: 'Large Boardroom (16–20 seats)', dimensions: '25 × 16', sqft: 400 },
    conferenceRoom: { label: 'Conference Room (8–10 seats)', dimensions: '20 × 15', sqft: 300 },
    smallMeetingRoom: { label: 'Small Meeting Room (6–8 seats)', dimensions: '15 × 15', sqft: 225 },
    breakoutRoom: { label: 'Break Out Room (4–6 seats)', dimensions: '10 × 10', sqft: 100 },
    largeReception: { label: 'Large Reception', dimensions: '25 × 20', sqft: 500 },
    regularReception: { label: 'Regular Reception', dimensions: '20 × 15', sqft: 300 },
    lunchRoom: { label: 'Lunch Room (15–20 seats)', dimensions: '20 × 15', sqft: 300 },
    smallLunchRoom: { label: 'Small Lunch Room (6–8 seats)', dimensions: '15 × 15', sqft: 225 },
    serverRoom: { label: 'Server Room', dimensions: '5 × 5', sqft: 25 },
    coffeeBar: { label: 'Coffee Bar', dimensions: '6 × 10', sqft: 60 },
  };

  const calculations = useMemo(() => {
    const subtotal = Object.entries(spaces).reduce((sum, [key, count]) => {
      return sum + (spaceDefinitions[key].sqft * count);
    }, 0);

    const circulationAllowance = Math.round(subtotal * 0.26);
    const totalUsableArea = subtotal + circulationAllowance;
    const grossUpFactor = Math.round(totalUsableArea * 0.19);
    const totalRentableArea = totalUsableArea + grossUpFactor;

    const classACost = totalRentableArea * 50;
    const classBCost = totalRentableArea * 30;
    const classCCost = totalRentableArea * 20;

    return {
      subtotal,
      circulationAllowance,
      totalUsableArea,
      grossUpFactor,
      totalRentableArea,
      classACost,
      classBCost,
      classCCost,
    };
  }, [spaces]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to an API
    console.log('Form submitted:', formData, calculations);
    // Generate PDF or trigger download
    alert('Thank you! You\'re now signed up for Deals of the Quarter.');
    onClose();
  };

  const isDark = colorMode === 'dark';
  const accentBg = isDark ? 'rgba(201, 162, 39, 0.1)' : 'rgba(201, 162, 39, 0.08)';
  const accentBorder = isDark ? 'rgba(201, 162, 39, 0.3)' : 'rgba(201, 162, 39, 0.2)';

  return (
    <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <VStack align="stretch" spacing={12}>
          {/* Header */}
          <Box>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={colors.textSubtle}
              letterSpacing="0.1em"
              textTransform="uppercase"
              mb={3}
            >
              Office Space Calculator
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontFamily="heading"
              fontWeight="400"
              color={colors.textPrimary}
              mb={4}
            >
              Calculate Your Space Needs
            </Heading>
            <Text fontSize="lg" color={colors.textMuted} lineHeight="1.7" maxW="720px">
              Fast, accurate office space calculations. See real-time estimates for Class A, B, and C buildings in Calgary.
            </Text>
          </Box>

          {/* Offices */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Offices
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <SpaceInput
                label={spaceDefinitions.ceoOffice.label}
                dimensions={spaceDefinitions.ceoOffice.dimensions}
                value={spaces.ceoOffice}
                onChange={(val) => setSpaces({ ...spaces, ceoOffice: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.partnerOffice.label}
                dimensions={spaceDefinitions.partnerOffice.dimensions}
                value={spaces.partnerOffice}
                onChange={(val) => setSpaces({ ...spaces, partnerOffice: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.standardOffice.label}
                dimensions={spaceDefinitions.standardOffice.dimensions}
                value={spaces.standardOffice}
                onChange={(val) => setSpaces({ ...spaces, standardOffice: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.smallOffice.label}
                dimensions={spaceDefinitions.smallOffice.dimensions}
                value={spaces.smallOffice}
                onChange={(val) => setSpaces({ ...spaces, smallOffice: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.efficientOffice.label}
                dimensions={spaceDefinitions.efficientOffice.dimensions}
                value={spaces.efficientOffice}
                onChange={(val) => setSpaces({ ...spaces, efficientOffice: val })}
                colors={colors}
              />
            </SimpleGrid>
          </Box>

          {/* Cubicles/Work Stations */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Cubicles/Work Stations
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <SpaceInput
                label={spaceDefinitions.supervisorWorkstation.label}
                dimensions={spaceDefinitions.supervisorWorkstation.dimensions}
                value={spaces.supervisorWorkstation}
                onChange={(val) => setSpaces({ ...spaces, supervisorWorkstation: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.standardCubicle.label}
                dimensions={spaceDefinitions.standardCubicle.dimensions}
                value={spaces.standardCubicle}
                onChange={(val) => setSpaces({ ...spaces, standardCubicle: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.smallCubicle.label}
                dimensions={spaceDefinitions.smallCubicle.dimensions}
                value={spaces.smallCubicle}
                onChange={(val) => setSpaces({ ...spaces, smallCubicle: val })}
                colors={colors}
              />
            </SimpleGrid>
          </Box>

          {/* Meeting Room */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Meeting Room
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <SpaceInput
                label={spaceDefinitions.largeBoardroom.label}
                dimensions={spaceDefinitions.largeBoardroom.dimensions}
                value={spaces.largeBoardroom}
                onChange={(val) => setSpaces({ ...spaces, largeBoardroom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.conferenceRoom.label}
                dimensions={spaceDefinitions.conferenceRoom.dimensions}
                value={spaces.conferenceRoom}
                onChange={(val) => setSpaces({ ...spaces, conferenceRoom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.smallMeetingRoom.label}
                dimensions={spaceDefinitions.smallMeetingRoom.dimensions}
                value={spaces.smallMeetingRoom}
                onChange={(val) => setSpaces({ ...spaces, smallMeetingRoom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.breakoutRoom.label}
                dimensions={spaceDefinitions.breakoutRoom.dimensions}
                value={spaces.breakoutRoom}
                onChange={(val) => setSpaces({ ...spaces, breakoutRoom: val })}
                colors={colors}
              />
            </SimpleGrid>
          </Box>

          {/* Other Areas */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Other Areas
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <SpaceInput
                label={spaceDefinitions.largeReception.label}
                dimensions={spaceDefinitions.largeReception.dimensions}
                value={spaces.largeReception}
                onChange={(val) => setSpaces({ ...spaces, largeReception: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.regularReception.label}
                dimensions={spaceDefinitions.regularReception.dimensions}
                value={spaces.regularReception}
                onChange={(val) => setSpaces({ ...spaces, regularReception: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.lunchRoom.label}
                dimensions={spaceDefinitions.lunchRoom.dimensions}
                value={spaces.lunchRoom}
                onChange={(val) => setSpaces({ ...spaces, lunchRoom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.smallLunchRoom.label}
                dimensions={spaceDefinitions.smallLunchRoom.dimensions}
                value={spaces.smallLunchRoom}
                onChange={(val) => setSpaces({ ...spaces, smallLunchRoom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.serverRoom.label}
                dimensions={spaceDefinitions.serverRoom.dimensions}
                value={spaces.serverRoom}
                onChange={(val) => setSpaces({ ...spaces, serverRoom: val })}
                colors={colors}
              />
              <SpaceInput
                label={spaceDefinitions.coffeeBar.label}
                dimensions={spaceDefinitions.coffeeBar.dimensions}
                value={spaces.coffeeBar}
                onChange={(val) => setSpaces({ ...spaces, coffeeBar: val })}
                colors={colors}
              />
            </SimpleGrid>
          </Box>

          <Divider borderColor={colors.border} />

          {/* Summary Section */}
          <Box
            p={8}
            bg={accentBg}
            border="2px solid"
            borderColor={accentBorder}
            borderRadius="lg"
          >
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Summary
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
              <ResultCard
                label="Subtotal"
                value={calculations.subtotal.toLocaleString()}
                unit="ft²"
                colors={colors}
              />
              <ResultCard
                label="Circulation Allowance (26%)"
                value={calculations.circulationAllowance.toLocaleString()}
                unit="ft²"
                colors={colors}
              />
              <ResultCard
                label="Total Usable Area"
                value={calculations.totalUsableArea.toLocaleString()}
                unit="ft²"
                colors={colors}
              />
              <ResultCard
                label="Gross Up Factor (19%)"
                value={calculations.grossUpFactor.toLocaleString()}
                unit="ft²"
                colors={colors}
              />
            </SimpleGrid>
            <ResultCard
              label="Total Rentable Area"
              value={calculations.totalRentableArea.toLocaleString()}
              unit="ft²"
              highlight
              colors={{ ...colors, accentBg, accentBorder }}
            />

            <Divider my={8} borderColor={colors.border} />

            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Annual Cost Estimates
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box
                p={5}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="md"
              >
                <Text fontSize="sm" fontWeight="600" color={colors.textSubtle} mb={2}>
                  CLASS A ($50/RSF)
                </Text>
                <Text fontSize="2xl" fontWeight="700" color={colors.textPrimary} mb={1}>
                  ${calculations.classACost.toLocaleString()}
                </Text>
                <Text fontSize="sm" color={colors.textMuted}>
                  ${Math.round(calculations.classACost / 12).toLocaleString()}/month
                </Text>
              </Box>
              <Box
                p={5}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="md"
              >
                <Text fontSize="sm" fontWeight="600" color={colors.textSubtle} mb={2}>
                  CLASS B ($30/RSF)
                </Text>
                <Text fontSize="2xl" fontWeight="700" color={colors.textPrimary} mb={1}>
                  ${calculations.classBCost.toLocaleString()}
                </Text>
                <Text fontSize="sm" color={colors.textMuted}>
                  ${Math.round(calculations.classBCost / 12).toLocaleString()}/month
                </Text>
              </Box>
              <Box
                p={5}
                bg={colors.bgCard}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="md"
              >
                <Text fontSize="sm" fontWeight="600" color={colors.textSubtle} mb={2}>
                  CLASS C ($20/RSF)
                </Text>
                <Text fontSize="2xl" fontWeight="700" color={colors.textPrimary} mb={1}>
                  ${calculations.classCCost.toLocaleString()}
                </Text>
                <Text fontSize="sm" color={colors.textMuted}>
                  ${Math.round(calculations.classCCost / 12).toLocaleString()}/month
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Area of Interest */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Area of Interest
            </Heading>
            <Text fontSize="md" color={colors.textMuted} mb={4}>
              Choose all that apply
            </Text>
            <CheckboxGroup
              value={formData.areas}
              onChange={(val) => setFormData({ ...formData, areas: val })}
            >
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                <Checkbox value="downtown-core">Downtown Core</Checkbox>
                <Checkbox value="downtown-west">Downtown West</Checkbox>
                <Checkbox value="downtown-east">Downtown East</Checkbox>
                <Checkbox value="beltline">Beltline</Checkbox>
                <Checkbox value="suburban-north-east">Suburban North East</Checkbox>
                <Checkbox value="suburban-north-west">Suburban North West</Checkbox>
                <Checkbox value="suburban-south-east">Suburban South East</Checkbox>
                <Checkbox value="suburban-south-west">Suburban South West</Checkbox>
                <Checkbox value="outside-calgary">Outside Calgary</Checkbox>
              </SimpleGrid>
            </CheckboxGroup>
          </Box>

          {/* Desired Amenities */}
          <Box>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="600"
              color={colors.textPrimary}
              mb={6}
            >
              Desired Amenities
            </Heading>
            <Text fontSize="md" color={colors.textMuted} mb={4}>
              Choose all that apply
            </Text>
            <CheckboxGroup
              value={formData.amenities}
              onChange={(val) => setFormData({ ...formData, amenities: val })}
            >
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                <Checkbox value="golf-simulator">Golf Simulator</Checkbox>
                <Checkbox value="conference-facility">Conference Facility</Checkbox>
                <Checkbox value="gym">Gym</Checkbox>
                <Checkbox value="bike-storage">Bike Storage</Checkbox>
                <Checkbox value="parking">Parking</Checkbox>
              </SimpleGrid>
            </CheckboxGroup>
          </Box>

          {/* CTA for PDF Download */}
          <Box textAlign="center" py={8}>
            <Heading as="h3" fontSize="2xl" fontWeight="600" color={colors.textPrimary} mb={4}>
              Get Your Custom PDF Report
            </Heading>
            <Text fontSize="lg" color={colors.textMuted} mb={6} maxW="600px" mx="auto">
              Download a detailed summary and get exclusive access to Calgary's top office deals.
            </Text>
            <Button
              size="lg"
              bg={isDark ? 'accent.gold' : 'navy.900'}
              color={isDark ? 'navy.900' : 'white'}
              px={10}
              h="56px"
              fontSize="md"
              fontWeight="600"
              onClick={onOpen}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Download PDF + Get Deals
            </Button>
          </Box>
        </VStack>
      </Container>

      {/* Modal for Lead Capture */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={colors.bgCard} color={colors.textPrimary}>
          <ModalHeader>Get Your PDF + Deals of the Quarter</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleFormSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    borderColor={colors.border}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    borderColor={colors.border}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Company</FormLabel>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    borderColor={colors.border}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    borderColor={colors.border}
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="lg"
                  bg={isDark ? 'accent.gold' : 'navy.900'}
                  color={isDark ? 'navy.900' : 'white'}
                  w="full"
                  mt={4}
                  _hover={{ opacity: 0.9 }}
                >
                  Download PDF
                </Button>
                <Text fontSize="sm" color={colors.textMuted} textAlign="center">
                  You'll receive your PDF and be added to our quarterly deals list.
                </Text>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
