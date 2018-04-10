import {search} from 'jmespath';
import { observable } from "mobx";

const buildModuleAliases = (...args) => {
  const [MODULE_NAME, ...rest] = args;
  const others = {};

  rest.forEach(item => others[item] = `${MODULE_NAME}/${item}`)

  return {
    MODULE_NAME,
    ...others
  }
}

const buildObservableObject = STATE_PROPS => {
  return Object.keys(STATE_PROPS).reduce((observables, key) => {
    return {
      ...observables,
      [key]: observable
    }
  }, {})
}

const cherryPick = (data, query) => search(data, query);

const unflatten = (object, delimiter = '.') => {
  const result = {};
  const [
    key,
    value
  ] = Object.entries(object)[0];

  key.split(delimiter).reduce((finalNested, currentKey, i, keys) => {
    return (
      i === keys.length - 1
      ? finalNested[currentKey] = value
      : finalNested[currentKey] = finalNested[currentKey] ? finalNested[currentKey] : {}
    )
  }, result);

  return result;
}

const mergeDeep = (...objects) => {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export {
  buildModuleAliases,
  buildObservableObject,
  cherryPick,
  unflatten,
  mergeDeep
}
