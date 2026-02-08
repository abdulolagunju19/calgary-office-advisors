import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import customTheme from '../styles/theme';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 100,
});

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          html {
            min-width: 320px;
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? '#ffffff' : '#0d1821'};
          }
          
          /* NProgress custom styling */
          #nprogress .bar {
            background: #c9a227 !important;
            height: 3px !important;
          }
          
          #nprogress .peg {
            box-shadow: 0 0 10px #c9a227, 0 0 5px #c9a227 !important;
          }
          
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${colorMode === 'light' ? '#f0f0f0' : '#1a1a1a'};
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${colorMode === 'light' ? '#c5c5c5' : '#444444'};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${colorMode === 'light' ? '#a8a8a8' : '#555555'};
          }
          
          /* Selection styling */
          ::selection {
            background-color: #c9a227;
            color: #102a43;
          }
          
          ::-moz-selection {
            background-color: #c9a227;
            color: #102a43;
          }
          
          /* Focus styles for accessibility */
          :focus-visible {
            outline: 2px solid #c9a227;
            outline-offset: 2px;
          }
          
          /* Link underline animation */
          a {
            text-decoration: none;
          }
        `}
      />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    const handleError = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#102a43" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Google Analytics */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} 
        strategy="afterInteractive" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      
      <ChakraProvider resetCSS theme={customTheme}>
        <ColorModeProvider
          options={{
            initialColorMode: 'light',
            useSystemColorMode: false,
          }}
        >
          <GlobalStyle>
            <Component {...pageProps} />
            <Analytics />
          </GlobalStyle>
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}
