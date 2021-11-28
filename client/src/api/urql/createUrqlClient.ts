import { cacheExchange, dedupExchange, fetchExchange } from '@urql/core';
import type { NextUrqlClientConfig } from 'next-urql';

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange, ctx) => {

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}