import React from 'react';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const CALGARY_CENTER = [51.0447, -114.0719];
const DEFAULT_ZOOM = 13;

const customIcon = new L.DivIcon({
  html: `<span style="
    display: block;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    background: #2c5282;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  "></span>`,
  className: 'companies-map-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -18],
});

export default function CompaniesMap({ companies = [] }) {
  return (
    <Box
      w="100%"
      h={{ base: '320px', md: '400px' }}
      borderRadius="lg"
      overflow="hidden"
      bg="gray.100"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      _dark={{ bg: 'whiteAlpha.08', borderColor: 'whiteAlpha.2' }}
      sx={{
        '& .companies-map-marker': { border: 'none', background: 'transparent' },
        '& .leaflet-popup-content-wrapper': { borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        '& .leaflet-popup-content': { margin: '10px 14px', fontSize: '14px', fontWeight: '500' },
      }}
    >
      <MapContainer
        center={CALGARY_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='https://carto.com/attributions'>CARTO</a>"
          subdomains="abcd"
          maxZoom={19}
        />
        {companies.filter(c => typeof c.lat === 'number' && typeof c.lng === 'number').map((company, idx) => (
          <Marker key={idx} position={[company.lat, company.lng]} icon={customIcon}>
            <Popup className="companies-map-popup">
              {company.name || 'Company'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
