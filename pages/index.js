import Feed from '../components/feed';
import { initializeStore, ActionTypes } from '../redux/store';
import UAParser from 'ua-parser-js';

export default function Index(props) {
  return <Feed {...props} />;
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const userAgent = req && JSON.parse(JSON.stringify(UAParser(req.headers['user-agent'])));

  const ipLookup = async () => {
    const res = await fetch('http://ip-api.com/json');
    const ipData = await res.json();

    return ipData;
  };

  const ipData = await ipLookup();

  const filter = (() => {
    const entries = Object.entries(query);

    if (entries.length === 0) {
      return `city=${ipData.city}`;
    } else {
      return Object.entries(query).reduce((params, value, currentIndex) => {
        if (Array.isArray(params)) {
          return `${params.join('=')}`;
        }

        return `${params}&${value.join('=')}`;
      });
    }
  })();

  const res = await fetch(`http://opentable.herokuapp.com/api/restaurants?${filter}`);
  const data = await res.json();

  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  dispatch({
    type: ActionTypes.LOAD,
    lastUpdate: Date.now(),
    currentPage: data.current_page,
    perPage: data.per_page,
    totalEntries: data.total_entries,
    restaurants: data.restaurants,
    currentFilter: filter,
    userAgent,
  });

  return { props: { initialReduxState: reduxStore.getState() } };
}
