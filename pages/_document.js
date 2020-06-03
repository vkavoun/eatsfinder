import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta property='og:title' content='The Rock' />
          <meta property='og:type' content='webapp' />
          <meta property='og:url' content='http://www.imdb.com/title/tt0117500/' />
          <meta property='og:image' content='http://ia.media-imdb.com/images/rock.jpg' />
          <meta property='og:description' content='find your eats' />
          <meta property='og:locale' content='en_CA' />
          <meta property='og:locale:alternate' content='fr_FR' />
          <meta property='og:site_name' content='eats.now.sh' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <head>
          <title>Find your Eats!</title>
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
