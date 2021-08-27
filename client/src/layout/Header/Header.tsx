import React from 'react';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';

import styles from './.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.logo}>acmeet</a>
        </Link>
      </div>
      <div className={styles.accounts}>
        <Link href="/signup">
          <a>sign up</a>
        </Link>
        <Link href="/login">
          <a>login</a>
        </Link>
      </div>
      <div className={styles.controls}>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;