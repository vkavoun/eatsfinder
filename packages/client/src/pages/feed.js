import React from 'react';
import { Route } from 'react-router-dom';

import EatsPage from './eats';

const FeedPage = ({ match }) => (
  <div>
    <Route path={`${match.url}/:eatsId`} component={EatsPage} />
    <Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
  </div>
);

export default FeedPage;
