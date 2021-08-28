import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/context/Theme';
import Layout from '@/layout/Layout';

import '../styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
