import React from 'react';

import styles from './.module.scss';

const REPO_LINK = `github.com/acmeet/acmeet`;

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href={REPO_LINK}>GitHub</a>
      <a href={`${REPO_LINK}/issues`}>Issues</a>
    </footer>
  );
};

export default Footer;