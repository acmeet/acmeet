import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/context/Theme';
import Layout from '@/layout/Layout';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

import '../styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Layout>
      <Header {...pageProps} />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  </ThemeProvider>
);

export default App;
