import { ACTION } from './constants';

class PmWorker {
  source;
  data;

  // Copied code from MDN Web suggestion
  looseJsonParse(obj) {
    return Function(`"use strict";return (${obj})`)();
  }

  constructor(event) {
    this.source = event.source;
    this.data = this.looseJsonParse(event.data);
    const { key, value } = this.data;
    switch (this.data.action) {
      case ACTION.STORE_LOCALSTORAGE:
        localStorage.setItem(key, value);
        break;
      case ACTION.GET_LOCALSTORAGE:
        this.source.postMessage(localStorage.getItem(key), "*");
        break;
    }
  }
}

export { PmWorker };
