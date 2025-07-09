import Head from 'next/head';

export default function Layout({ children, title, description, image }) {

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>The Nomas Club - Built For Those Who Move Differently</title>
        <meta name="description" content="We are Bali's fastest growing community with over 150+ members worldwide. Built around movement, mindset and meaning for those who want more out of life." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://thenomasclub.com/" />

        {/* Open Graph (Facebook, LinkedIn, etc) */}
        <meta property="og:title" content="The Nomas Club - Built For Those Who Move Differently" />
        <meta property="og:description" content="We are Bali's fastest growing community with over 150+ members worldwide. Built around movement, mindset and meaning for those who want more out of life." />
        <meta property="og:url" content="https://thenomasclub.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/tnc-og.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Nomas Club - Built For Those Who Move Differently" />
        <meta name="twitter:description" content="We are Bali's fastest growing community with over 150+ members worldwide. Built around movement, mindset and meaning for those who want more out of life." />
        <meta name="twitter:image" content="/tnc-og.jpg" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://cdn.builder.io" />
        <link rel="dns-prefetch" href="https://cdn.builder.io" />
        {/* Add your fonts CDN here too if needed */}
      </Head>

      <main>{children}</main>
    </>
  );
}
