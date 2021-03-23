import Head from 'next/head';

type Props = {
  title: string
};

const HtmlHead:React.FC<Props> = ({ title }:Props) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="icon" type="image/png" sizes="32x32" href="/box-32x32.png" />
  </Head>
);

export default HtmlHead;
