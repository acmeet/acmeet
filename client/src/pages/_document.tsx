import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import InitialThemeScript from '@/context/Theme/InitialThemeScript';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <InitialThemeScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
};

export default Document;