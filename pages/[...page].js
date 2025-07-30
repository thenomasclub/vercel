import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getServerSideProps(context) {
  const fullPath = context.req.url || '/';
  const urlPath = fullPath.split('?')[0];

  const content = await builder
    .get('page', {
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

export default function Page({ content }) {
  return (
    <>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <h1>404 - Page Not Found</h1>
      )}
    </>
  );
}
