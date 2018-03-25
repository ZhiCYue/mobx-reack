
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import routes from './router/index';


Router.run(routes, Router.HashLocation, (Root) => {
    ReactDOM.render(<Root/>, document.getElementById('app'));
});