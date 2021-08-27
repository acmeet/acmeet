import React from 'react';

import styles from './.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles['page-container']}>
      { children }
    </div>
  );
};

export default Layout;