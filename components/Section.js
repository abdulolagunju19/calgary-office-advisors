import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Section = ({ 
  children, 
  bg, 
  py = { base: 16, md: 24, lg: 32 },
  id,
  fullWidth = false,
  animate = true,
  ...props 
}) => {
  const content = (
    <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
      {children}
    </Container>
  );

  if (animate) {
    return (
      <MotionBox
        as="section"
        id={id}
        bg={bg}
        py={py}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...props}
      >
        {fullWidth ? children : content}
      </MotionBox>
    );
  }

  return (
    <Box as="section" id={id} bg={bg} py={py} {...props}>
      {fullWidth ? children : content}
    </Box>
  );
};

export default Section;
