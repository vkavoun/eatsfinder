import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Page from './page';
import FeedItem from './feed-item';

export default function Feed(props) {
  const { count, cities } = useSelector((state) => {
    return state;
  });

  const getKeys = (object) => {
    return Object.keys(object);
  };

  return useMemo(
    () => (
      <Page>
        {cities &&
          getKeys(cities).map((cityKey) => {
            return getKeys(cities[cityKey]).map((eatsKey, eatsIndex) => {
              return (
                <React.Fragment key={`eats-${eatsKey}-${eatsIndex}`}>
                  <FeedItem key={`feed-item-${eatsKey}`} props={cities[cityKey][eatsKey]} eatsIndex={eatsIndex} />
                </React.Fragment>
              );
            });
          })}
      </Page>
    ),
    [count]
  );
}
