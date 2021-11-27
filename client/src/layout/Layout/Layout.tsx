import React from 'react';

import Header from '../header';
import Footer from '../footer';

import styles from './.module.scss'

const Layout: React.FC = ({ children, ...pageProps }) => {
  return (
    <div className={styles['page-container']}>
      <Header {...pageProps} />
      <main className={styles.content}>
        { children }
      </main>
      <Footer />
    </div>
  );
};

export default Layout;