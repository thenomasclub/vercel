import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getServerSideProps(context) {
  const content = await builder
    .get('page', {
      url: context.resolvedUrl,
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