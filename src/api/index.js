import Axios, {CancelToken} from 'axios';
import Qs from 'qs';

import {cherryPick} from '../helpers';

const baseURL = 'http://localhost:8888/drupal';
const GRAPHQL_URL = 'http://localhost:8080/graphql';

const graphql = (query, variables) => {
  return Axios.request({
    baseURL: GRAPHQL_URL,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: {query, variables}
  });
}

const req = async args => {
  const {
    REQUEST: {
      url,
      query,
      schema,
      method = 'get'
    },
    data = null,
    params = null,
    headers = {'Content-Type': 'application/x-www-form-urlencoded'},
    ...otherParams
  } = args,
    paramsSerializer = params => Qs.stringify(params, {arrayFormat: 'brackets'});

  const res = await Axios.request({
    url,
    baseURL,
    method,
    headers,
    params,
    data,
    paramsSerializer,
    ...otherParams
  });

  const processedResponse = cherryPick({res}, query);

  return await schema.validate(processedResponse, {
    // options here
    strict: true
  })
  .then(isValidResponse => isValidResponse)
  .catch(error => {
    const {
      value,
      errors: [errorToPrint]
    } = error;

    throw new TypeError(`${errorToPrint} with the value ${JSON.stringify(value)}`);

    return value;
  });
}

const q = async requests => {
  const requestsKeys = Object.keys(requests);
  const processedResponses = await Axios.all(requestsKeys.map(key => req(requests[key])));

  return requestsKeys.reduce((responsesCollection, currentResponse, i) => {
    return {
      ...responsesCollection,
      [currentResponse]: processedResponses[i]
    }
  }, {});
}

export default {
  graphql,
  req,
  q
}
