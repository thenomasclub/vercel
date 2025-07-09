import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect } from 'react';

builder.init('29cbfd023c4d47f1ac4aa0acdc84a51c'); // 🔑 Replace this with your real API key

export async function getStaticProps({ params }) {
  const pagePath = '/' + (params?.page?.join('/') || '');

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: pagePath,
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  return {
    paths: [], // Next.js will build these pages on-demand
    fallback: true,
  };
}

export default function Page({ page }) {
  if (!page) {
    return <div>Page not found</div>;
  }

  return <BuilderComponent model="page" content={page} />;
}

