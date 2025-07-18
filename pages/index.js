import dynamic from 'next/dynamic';
import { builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Dynamically load BuilderComponent only on the client
const BuilderComponent = dynamic(
  () => import('@builder.io/react').then(mod => mod.BuilderComponent),
  { ssr: false } // 👈 disables server-side rendering for this component
);

export async function getServerSideProps() {
  const content = await builder
    .get('page', {
      url: '/',
    })
    .toPromise();

  return {
    props: {
      content: content || null,
    },
  };
}

export default function Home({ content }) {
  return (
    <>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <h1>No content found</h1>
      )}
    </>
  );
}
