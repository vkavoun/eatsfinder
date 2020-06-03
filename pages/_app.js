import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import Layout from '../components/layout';

export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric);
  } else if (metric.label === 'custom') {
    console.log(metric);
  }
}

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
