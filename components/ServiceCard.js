import React from 'react';
import { Box, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useColors from '../hooks/useColors';

const MotionBox = motion(Box);

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  index = 0,
  variant = 'default'
}) => {
  const colors = useColors();

  const isFeatured = variant === 'featured';

  const bgColor = isFeatured ? 'navy.800' : colors.bgCard;
  const textColor = isFeatured ? 'white' : colors.textPrimary;
  const descColor = isFeatured ? 'whiteAlpha.800' : colors.textMuted;
  const iconColor = 'accent.gold';
  const iconBg = isFeatured ? 'whiteAlpha.100' : (colors.isDark ? '#1a2830' : 'surface.cream');
  const borderColor = isFeatured ? 'transparent' : colors.border;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        p={{ base: 6, md: 8 }}
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
          borderColor: isFeatured ? 'transparent' : colors.borderHover,
        }}
        h="100%"
      >
        <VStack align="flex-start" spacing={4} h="100%">
          {icon && (
            <Box
              p={3}
              bg={iconBg}
              color={iconColor}
            >
              <Icon as={icon} boxSize={6} />
            </Box>
          )}
          <Heading 
            as="h3" 
            size="md" 
            color={textColor}
            fontFamily="heading"
            fontWeight="400"
          >
            {title}
          </Heading>
          <Text 
            fontSize="sm" 
            color={descColor}
            lineHeight="1.7"
            flex="1"
          >
            {description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default ServiceCard;
