import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getServerSideProps(context) {
  const fullPath = context.req.url || '/';
  const urlPath = fullPath.split('?')[0];

  const content = await builder
    .get('home', {
      userAttributes: {
        urlPath,
      },
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
        <BuilderComponent model="home" content={content} />
      ) : (
        <h1>No content found</h1>
      )}
    </>
  );
}
