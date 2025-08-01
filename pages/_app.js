import Layout from '../components/Layout';
import '../styles/globals.css';
import autoScroll from '@/hooks/autoScroll';

function MyApp({ Component, pageProps }) {
  autoScroll('auto-scroll', 0.5);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
