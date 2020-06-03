import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ActionTypes = {
  SCROLL_DOWN: 'SCROLL_DOWN',
  SCROLL_UP: 'SCROLL_UP',
  INCREMENT: 'INCREMENT',
  FILTER: 'FILTER',
  FILTER_LOAD: 'FILTER_LOAD',
  RESET: 'RESET',
  LOAD: 'LOAD',
  LOAD_MORE: 'LOAD_MORE',
};

let store;

const initialState = {
  lastUpdate: 0,
  count: 0,
  currentPosition: 0,
  totalEntries: 0,
  pageSize: 0,
  currentPage: 0,
  currentFilter: '',
  cities: {},
  userAgent: '',
};

function generateKey(item) {
  return `${item.city}|${item.name}|${item.address}|${item.area}|${item.id}`.toUpperCase();
}

function appendToCitiesState(state, data) {
  if (data) {
    let { cities } = state;
    data.forEach((element) => {
      const city = element.city.toUpperCase();
      if (cities[city]) {
        cities[city][generateKey(element)] = element;
      } else {
        let map = {};
        map[generateKey(element)] = element;
        cities[city] = map;
      }
    });
  }

  return state.cities;
}

function hasSearchKey(search) {
  search = search.toUpperCase();
  const city = search.split('|');

  if (this.cities.has(city)) {
    const keysArray = [...this.cities.get(city).keys()];
    const records = keysArray.filter((key) => {
      return key.includes(search);
    });

    return { has: records.length > 0, records };
  }

  return { has: false };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD:
    case ActionTypes.FILTER_LOAD:
      const { lastUpdate, currentPage, currentFilter, count, perPage, totalEntries, restaurants, userAgent } = action;

      const cities = appendToCitiesState(state, restaurants);

      return {
        ...state,
        lastUpdate,
        currentPage,
        currentFilter,
        count: count + restaurants.length,
        cities,
        pageSize: perPage,
        totalEntries,
        userAgent,
      };
    case ActionTypes.FILTER: {
    }
    case ActionTypes.SCROLL_UP:
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        currentPosition: state.currentPosition,
      };
    case ActionTypes.SCROLL_DOWN:
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        currentPosition: state.currentPosition,
      };
    case ActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + action.pageSize,
        currentPage: action.currentPage,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        count: initialState.currentPosition,
      };
    default:
      return state;
  }
};

async function loadMore(dispatch, getState) {
  return (next) => async (action) => {
    if (action.type === ActionTypes.LOAD_MORE) {
      const { currentFilter } = getState();
      const res = await fetch(`http://opentable.herokuapp.com/api/restaurants?${currentFilter}&${action.page}`);
      const data = await res.json();

      action = {
        type: ActionTypes.LOAD_MORE,
        lastUpdate: Date.now(),
        currentPage: data.current_page,
        perPage: data.per_page,
        totalEntries: data.total_entries,
        restaurants: data.restaurants,
      };
    }

    console.log('will dispatch', action);
    dispatch(action);

    console.log('state after dispatch', getState());
    return next(action);
  };
}

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware()));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
