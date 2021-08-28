import type { NextPage } from 'next';
import Head from 'next/head';

import Home from '@/sections/Index';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>acmeet | meeting scheduling</title>
        <meta name="description" content="convenient platform to schedule meetings" />
        <meta property="og:title" content="acmeet | meeting scheduling" />
        <meta property="og:description" content="convenient platform to schedule meetings" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;