import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getStaticProps({ params }) {
  const urlPath = '/' + (params?.page ? params.page.join('/') : '');

  const builderContent = await builder
    .get('page', { url: urlPath })
    .toPromise();

  return {
    props: {
      builderContent: builderContent || null,
    },
    notFound: !builderContent,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],           // no static paths
    fallback: 'blocking' // generate on-demand
  };
}

export default function CatchAllPage({ builderContent }) {
  if (!builderContent) {
    return <h1>404 - Page Not Found</h1>;
  }

  return <BuilderComponent model="page" content={builderContent} />;
}
