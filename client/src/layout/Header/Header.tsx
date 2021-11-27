import React from 'react';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';

import styles from './.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="8" fill="var(--text-color)"/>
              <rect x="24" y="8" width="32" height="32" rx="8" fill="var(--background-color)"/>
            </svg>
            <span>acmeet</span>
          </a>
        </Link>
      </div>
      {/* <div className={styles.accounts}>
        <Link href="/signup">
          <a>sign up</a>
        </Link>
        <Link href="/login">
          <a>login</a>
        </Link>
      </div> */}
      <div className={styles.controls}>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;