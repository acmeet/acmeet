import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

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