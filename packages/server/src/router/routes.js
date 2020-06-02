import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage, FeedPage } from '@eatsfinder/client';

const MultipleRoutes = () => (
  <div>
    <Route exact path="/with-react-router" component={HomePage} />
    <Route path="/with-react-router/topics" component={FeedPage} />
  </div>
);

export default MultipleRoutes;
