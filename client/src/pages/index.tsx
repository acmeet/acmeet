import { withUrql } from '@/api/urql/withUrql';

import Head from '@/layout/head';
import Home from '@/sections/index';

import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <Head title="acmeet: meeting scheduling" />
      <Home />
    </>
  );
};

export default withUrql(HomePage);