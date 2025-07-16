// pages/index.js
import dynamic from 'next/dynamic';
import { builder } from '@builder.io/react';

builder.init('29cbfd023c4d47f1ac4aa0acdc84a51c');

const BuilderComponent = dynamic(() =>
  import('@builder.io/react').then(mod => mod.BuilderComponent),
  { ssr: false }
);

export async function getStaticProps() {
  const builderContent = await builder
    .get('page', { url: '/' })
    .toPromise();

  return {
    props: {
      builderContent: builderContent || null,
    },
  };
}

export default function Home({ builderContent }) {
  if (!builderContent) {
    return <div>No homepage content found.</div>;
  }

  return <BuilderComponent model="page" content={builderContent} />;
}