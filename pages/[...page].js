import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect } from 'react';

builder.init(process.env.BUILDER_API_KEY);

export async function getStaticProps({ params, preview = false }) {
  const pagePath = '/' + (params?.page?.join('/') || '');

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: pagePath,
      },
      options: {
        preview: preview || false,
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

