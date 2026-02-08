import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import useColors from '../hooks/useColors';

const SectionHeading = ({ 
  label, 
  title, 
  description, 
  align = 'left',
  maxW,
  mb = { base: 10, md: 16 },
}) => {
  const colors = useColors();

  return (
    <VStack 
      align={align === 'center' ? 'center' : 'flex-start'} 
      textAlign={align}
      spacing={4}
      mb={mb}
      maxW={maxW}
      mx={align === 'center' ? 'auto' : 0}
    >
      {label && (
        <Text
          fontSize="xs"
          fontWeight="600"
          color="accent.gold"
          letterSpacing="0.15em"
          textTransform="uppercase"
        >
          {label}
        </Text>
      )}
      <Heading 
        as="h2" 
        size="3xl"
        color={colors.textPrimary}
      >
        {title}
      </Heading>
      {description && (
        <Text 
          fontSize={{ base: 'md', md: 'lg' }}
          color={colors.textMuted}
          maxW={maxW || '600px'}
          lineHeight="1.8"
        >
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default SectionHeading;
