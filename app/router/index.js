import React from 'react';
import { Route } from 'react-router';


import App from '@/pages/index.jsx';
import Page01 from '@/pages/demo01/index.jsx';

import Page02 from '@/pages/demo02/index.jsx';

const routes = (
    <Route handler={App}>
        <Route name="home" path="/" handler={Page01}/>
        <Route name="page01" path="/demo01" handler={Page01}/>
        <Route name="page02" path="/demo02" handler={Page02}/>
    </Route>
);

export default routes;


