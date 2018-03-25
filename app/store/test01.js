import { observable, computed } from 'mobx';

'use strict'

class Store {
  @observable name = 'Bartek';
  @computed get decorated() {
    return `${this.name} is awesome!`;
  }
}

export default Store;