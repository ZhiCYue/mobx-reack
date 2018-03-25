import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

@observer
class Page01 extends React.Component {
  render() {
    return (
      <div className="index">
        <p>{this.props.store.test01.decorated}</p>
        <input
          defaultValue=""
          onChange={ (event) => this.props.store.test01.name = event.currentTarget.value }
        />
      </div>
    );
  }
}

export default Page01;