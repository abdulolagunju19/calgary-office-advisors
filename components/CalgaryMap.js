import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const CALGARY_CENTER = [51.0447, -114.0719];
const DEFAULT_ZOOM = 13;

/**
 * Client-only map using Leaflet from CDN. Shows Calgary with optional markers.
 * Markers should have { lat, lng, name }.
 * @param {Object} props
 * @param {Array} props.markers - Array of marker objects with lat, lng, name properties
 * @param {string} props.markerColor - Optional marker color (default: blue)
 */
export default function CalgaryMap({ markers = [], markerColor = '#2c5282' }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const initMap = () => {
      const L = window.L;
      if (!L) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        zoomControl: false,
      }).setView(CALGARY_CENTER, DEFAULT_ZOOM);

      L.control.zoom({ position: 'topright' }).addTo(map);
      mapRef.current = map;

      // CARTO Voyager – clean, modern basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Modern marker: small circle with shadow
      const markerHtml = `<span style="
        display: block;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        background: ${markerColor};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      "></span>`;
      const icon = L.divIcon({
        html: markerHtml,
        className: 'calgary-map-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -18],
      });

      const hasValidCoords = (m) => m && typeof m.lat === 'number' && typeof m.lng === 'number';
      markers.filter(hasValidCoords).forEach((marker) => {
        L.marker([marker.lat, marker.lng], { icon })
          .addTo(map)
          .bindPopup(marker.name || 'Location', {
            closeButton: true,
            className: 'calgary-map-popup',
          });
      });
    };

    if (window.L) {
      initMap();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers, markerColor]);

  return (
    <Box
      ref={containerRef}
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
        '& .calgary-map-marker': { border: 'none', background: 'transparent' },
        '& .leaflet-popup-content-wrapper': { borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        '& .leaflet-popup-content': { margin: '10px 14px', fontSize: '14px', fontWeight: '500' },
      }}
    />
  );
}
