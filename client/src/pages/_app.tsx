import type { AppProps } from 'next/app';

import Layout from '@/layout/Layout';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

import '../styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Header {...pageProps} />
    <Component {...pageProps} />
    <Footer />
  </Layout>
);

export default App;
