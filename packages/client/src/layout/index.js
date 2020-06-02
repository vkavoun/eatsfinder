import React from 'react';

export default function Layout({ Component, pageProps }) {
  const { ua } = pageProps;
  return (
    <React.Fragment>
      <Layout payload={ua}>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
