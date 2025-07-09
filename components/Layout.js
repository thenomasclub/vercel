// components/Layout.js
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>The Nomas Club</title>
        <meta name="description" content="Nomas Club – A modern digital experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* No header/footer here — it’s already inside Builder content */}
      <main>{children}</main>
    </>
  );
}
