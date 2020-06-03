import React from 'react';
import Link from 'next/link';

const Title = ({ name }) => {
  return <h3 aria-label={`name of the place is ${name}`}>{name}</h3>;
};

const ItemImage = ({ item }) => (
  <div className='item-image'>
    <img aria-label={`eats place name is ${item.name}`} src={item.image_url} alt={item.name} height='120' width='120' />
  </div>
);

const ItemDescription = ({ item }) => (
  <div className='item-description'>
    <div>
      <Title name={item.name} />
      <span>{item.price}</span>
    </div>
    <hr />
    <span aria-label={`the places address is ${item.address}`}>{item.address}</span>
  </div>
);

/**
 * 
    id: 21307,
    name: 'Scaramouche Restaurant',
    address: '1 Benvenuto Place',
    city: 'Toronto',
    state: 'ON',
    area: 'Toronto / SW Ontario',
    postal_code: 'M4V 2L1',
    country: 'CA',
    phone: '4169618011',
    lat: 43.68207,
    lng: -79.40041,
    price: 4,
    reserve_url: 'http://www.opentable.com/single.aspx?rid=21307',
    mobile_reserve_url: 'http://mobile.opentable.com/opentable/?restId=21307',
    image_url: 'https://www.opentable.com/img/restimages/21307.jpg'
  }

 */

function FeedItem({ props, eatsIndex }) {
  return (
    <div className='feed-item' aria-label={'eats place'} key={props.name}>
      <Link href={'/post/[id]'} as={`/post/${props.id}`}>
        <a>
          <ItemImage item={props} position={eatsIndex + 1} />
        </a>
      </Link>
      <ItemDescription item={props} />
      <React.Fragment key={`${props.id}`}>
        <dl>
          <dt>{props.name}</dt>
          <dd>{props.address}</dd>
          <dd>{props.price}</dd>
        </dl>
      </React.Fragment>
    </div>
  );
}

export default FeedItem;
