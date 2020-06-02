import React from 'react';
import ReactDOM from 'react-dom';
import Home from '@eatsfinder/client/pages/home.js';

ReactDOM.hydrate(<Home name={window.__INITIAL__DATA__.name} />, document.getElementById('root'));
