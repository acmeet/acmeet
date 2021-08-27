import type { AppProps } from 'next/app';

import Layout from '@/layout/Layout';

import '../styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
