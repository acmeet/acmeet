import React from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

import styles from './.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles['page-container']}>
      <Header />
      { children }
      <Footer />
    </div>
  );
};

export default Layout;