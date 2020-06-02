import React from 'react';

const EatsPage = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default EatsPage;
