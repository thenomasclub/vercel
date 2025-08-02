import { useEffect } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';
import { setupScrollHeader } from '../utils/setupScrollHeader';
import EventSlider from '../components/EventSlider';
import { initSlideToUnlock } from '@/utils/slideUnlock';
import { initAutoScroll } from '../hooks/autoScroll';


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
      urlPath,
    },
  };
}

export default function Page({ content, urlPath }) {
  useEffect(() => {
    const cleanupScrollHeader = setupScrollHeader();
    const cleanupAutoScroll = initAutoScroll();

    initSlideToUnlock({
      containerId: 'slide-unlock-container',
      redirectUrl: 'https://app.thenomasclub.com',
    });

    builder.setUserAttributes({
      urlPath: urlPath || '/',
    });

    return () => {
      if (cleanupScrollHeader) cleanupScrollHeader();
      if (cleanupAutoScroll) cleanupAutoScroll();
    };
  }, [urlPath]);

  return (
    <>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <h1>404 - Page Not Found</h1>
      )}

      <EventSlider />
    </>
  );
}