import React from 'react';
import ReactDOM from 'react-dom';

import { RouteHandler } from 'react-router';

import store from '@/store/store.js';

import '../resources/css/base.css';
import '../resources/css/normalize.css';
import '../resources/css/main.css';

// 测试语法
import './script.jsx'

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <p>Mobx Study.</p>
        <div>
            <RouteHandler store={store}/>
        </div>
      </div>
    );
  }
}

export default App;