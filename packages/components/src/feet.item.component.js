import React from 'react';
import Title from './title.component';

const ItemImage = ({ appno, totalapps, img }) => (
  <div className="col-left">
    <div className="app-no">
      <span className="current">{`0${appno}`}</span>
      <span className="connector">of </span>
      <br />
      <span className="total">{`0${totalapps}`}</span>
    </div>
    <img className="app-icon" src={img.src} alt={img.alt} height="120" width="120" />
  </div>
);

const ItemDescription = ({ app }) => (
  <div className="col-right">
    <div className="app-meta">
      <Title name={app.name} publisher={app.publisher} />
      <span className="app-lic">{app.price}</span>
    </div>
    <div className="app-intro" dangerouslySetInnerHTML={{ __html: app.desc }} />
    <hr />
    <div className="app-link">
      <a className="btn" href={app.link} target="_blank" rel="noreferrer noopener">
        Get App
      </a>
      <button
        type="button"
        className="ml-10 btn btn-twitter"
        onClick={() => {
          console.log(app.tweet);
        }}
      >
        <span className="icon icon-inline icon-twitter-light"></span>
        Share on Twitter
      </button>
    </div>
  </div>
);

const FeedItem = ({ apps, totalapps }) => {
  const cards = apps.map((app, index) => (
    <div className="app-card" key={app.name}>
      <ItemImage img={app.img} appno={index + 1} totalapps={totalapps} />
      <ItemDescription app={app} />
    </div>
  ));

  return cards;
};

export default FeedItem;
