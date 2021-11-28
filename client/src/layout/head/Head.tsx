import NextHead from 'next/head';

interface HeadProps {
  title: string;
  description?: string;
}

const Head: React.FC<HeadProps> = ({
  title,
  description = 'convenient platform to schedule meetings',
}) => {
  return (
    <NextHead>
      <title>{`${title} | acmeet`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/app.webmanifest" />
    </NextHead>
  )
};

export default Head;