import React from 'react';
import NextLink from 'next/link';
import { Box, Text, Link } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

/**
 * Get OSM/CARTO tile x,y from lat/lng and zoom.
 */
function getTileCoords(lat, lng, zoom) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const rad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n);
  return { x, y };
}

/**
 * CARTO Voyager tile URL for a given lat, lng, zoom. Use for map preview.
 */
export function getMapTileUrl(lat, lng, zoom = 13) {
  const { x, y } = getTileCoords(lat, lng, zoom);
  return `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${x}/${y}.png`;
}

export default function SubmarketCard({ submarket, basePath, colors }) {
  const href = `${basePath}/submarket/${submarket.id}`;
  const tileUrl = getMapTileUrl(submarket.lat, submarket.lng, 13);

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link
        display="block"
        bg={colors.bgCard}
        border="1px solid"
        borderColor={colors.border}
        borderRadius="lg"
        overflow="hidden"
        _hover={{ borderColor: colors.borderHover, textDecoration: 'none', transform: 'translateY(-2px)', boxShadow: 'md' }}
        transition="all 0.2s"
      >
        <Box position="relative" w="100%" aspectRatio="4/3" bg={colors.bgAlt} overflow="hidden">
          <Box
            as="img"
            src={tileUrl}
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
            sx={{ imageRendering: 'auto' }}
          />
        </Box>
        <Box p={4} display="flex" alignItems="center" gap={2}>
          <Box as={FiMapPin} boxSize={4} color={colors.textSecondary} flexShrink={0} />
          <Text fontWeight="600" color={colors.textPrimary} fontSize="md" noOfLines={1}>
            {submarket.name}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
}
