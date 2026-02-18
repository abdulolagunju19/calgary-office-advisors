import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to font providers for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Meta tags */}
        <meta name="description" content="Calgary Office Advisors - Strategic commercial real estate advisory, tenant representation, and market intelligence for Calgary businesses." />
        <meta name="author" content="Calgary Office Advisors" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Calgary Office Advisors | CRE Advisor" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
