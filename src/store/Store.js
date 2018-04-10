class StoreHandler {
  storeQueries = {};

  constructor(stores) {
    this.stores = stores;
  }

  async registerStore(name, store) {
    await new Promise(resolve => resolve(this.stores[name] = store));

    if (!this.storeQueries[name]) return false;

    this.storeQueries[name].forEach((method, i) => {
      const [
        fn,
        params,
        callback
      ] = method[i];

      if (this.stores[name] && this.stores[name][fn]) {
        new Promise(resolve => resolve(this.stores[name][fn](...Object.values(params)))).then(callback);
      } else {
        console.error(`Store name ${name} and/or method ${fn} does not exist`);
      }
    });

    delete this.storeQueries[name];
  }

  dispatch(storeAndMethod, params = {}, callback = () => {}) {
    if (storeAndMethod.indexOf('/') < 0) {
       throw new TypeError('Please provide a valid store namespace e.g Store/method')
       return false;
    }

    const [
      storeName,
      storeAction
    ] = storeAndMethod.split('/');


    if (this.stores[storeName] && this.stores[storeName][storeAction]) {
      return this.stores[storeName][storeAction](...Object.values(params));
    } else {
      if (!this.storeQueries[storeName]) this.storeQueries[storeName] = [];

      this.storeQueries[storeName] = [
        ...this.storeQueries[storeName],
        {
          [this.storeQueries[storeName].length]: [
            storeAction,
            params,
            callback
          ]
        }
      ]
    }
  }

  destroyStore(storeName) {
    delete this.stores[storeName];
  }

  getStoreKey(storeAndKey) {
    if (storeAndKey.indexOf('/') < 0) {
       throw new TypeError('Please provide a valid store namespace e.g Store/method')
       return false;
    }

    const [
      storeName,
      storeKey
    ] = storeAndKey.split('/');

    if (!this.stores[storeName] || !this.stores[storeName][storeKey]) {
      throw new TypeError('Store name or key does not exist')
      return false;
    }

    if (typeof this.stores[storeName][storeKey] === 'function') {
      throw new TypeError('Provided key is a method - please provide a valid immutable key')
      return false;
    }

    return this.stores[storeName][storeKey];
  }
}

export default StoreHandler;
