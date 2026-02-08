import React from 'react';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

// Client logos with actual image files
const clients = [
  { 
    name: 'Tetra Trust Company', 
    logo: '/images/Tetra-Trust-logo@2x.png',
    width: 120,
    height: 40,
  },
  { 
    name: 'Muslim Council of Calgary', 
    logo: '/images/muslim-council-of-calgary.png',
    width: 100,
    height: 50,
  },
  { 
    name: 'Maple Leaf Academy', 
    logo: '/images/maple-leaf-academy.png',
    width: 100,
    height: 50,
  },
  { 
    name: 'Tokopoly', 
    logo: '/images/tokopoly.avif',
    width: 100,
    height: 40,
  },
  { 
    name: 'Innotech College', 
    logo: '/images/innotech-college.png',
    width: 100,
    height: 45,
  },
  { 
    name: 'Guardteck', 
    logo: '/images/Guardteck_Logo.png',
    width: 110,
    height: 40,
  },
];

const ClientLogos = () => {
  return (
    <Box 
      py={12} 
      px={{ base: 4, md: 8 }}
      mx={{ base: -4, md: -8 }}
      bg="white"
      borderRadius="lg"
      overflow="hidden"
    >
      <Text
        fontSize="xs"
        fontWeight="600"
        color="navy.500"
        letterSpacing="0.15em"
        textTransform="uppercase"
        textAlign="center"
        mb={10}
      >
        Advising Organizations on Real Estate
      </Text>
      <MotionFlex
        justify="center"
        align="center"
        gap={{ base: 8, md: 12, lg: 16 }}
        flexWrap="wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Box
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.3s"
              opacity={0.7}
              filter="grayscale(30%)"
              _hover={{ 
                opacity: 1,
                filter: 'grayscale(0%)',
                transform: 'translateY(-2px)',
              }}
              role="group"
              minW={{ base: '120px', md: '140px' }}
              h={{ base: '60px', md: '70px' }}
              position="relative"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                style={{ 
                  objectFit: 'contain',
                  maxHeight: '50px',
                }}
              />
            </Box>
          </motion.div>
        ))}
      </MotionFlex>
    </Box>
  );
};

export default ClientLogos;
