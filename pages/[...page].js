import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';
import Layout from '../components/Layout';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getStaticProps({ params, preview = false }) {
  const pagePath = '/' + (params?.page?.join('/') || '');

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: pagePath,
      },
      options: { preview },
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
    paths: [],
    fallback: true,
  };
}

export default function Page({ page }) {
  const router = useRouter();
  const [previewPage, setPreviewPage] = useState(page);

  useEffect(() => {
    async function fetchPreview() {
      if (router.query['builder.preview']) {
        const fresh = await builder
          .get('page', {
            userAttributes: {
              urlPath: router.asPath.split('?')[0],
            },
            options: { preview: true },
          })
          .toPromise();

        if (fresh) setPreviewPage(fresh);
      }
    }

    fetchPreview();
  }, [router.asPath]);

  // 🚨 Critical fix: handle fallback state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!previewPage) {
    return <div>Page not found</div>;
  }

  return (
    <Layout>
      <BuilderComponent model="page" content={previewPage} />
    </Layout>
  );
}
