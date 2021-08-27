import React from 'react';
import Link from 'next/link';

import styles from './.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>acmeet</a>
      </Link>
      <div className={styles.accounts}>
        <Link href="/signup">
          <a>sign up</a>
        </Link>
        <Link href="/login">
          <a>login</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;