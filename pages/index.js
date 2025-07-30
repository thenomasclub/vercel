import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect } from 'react';

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
      urlPath,
    },
  };
}

export default function Home({ content, urlPath }) {
  useEffect(() => {
    builder.setUserAttributes({
      urlPath: urlPath || '/',
    });

    // ✅ Wait for full hydration before setting scroll logic
    setTimeout(() => {
      const header = document.querySelector('.scroll-header');
      if (!header) return;

      function onScroll() {
        if (window.scrollY > window.innerHeight * 0.9) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      window.addEventListener('scroll', onScroll);
      onScroll();
    }, 0); // Use 0 or 100ms — ensures it's post-hydration
  }, [urlPath]);

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
