import {
  mixed,
  object,
  boolean,
  array,
  string,
  number,
  date
} from 'yup';

export const USER_QUERIES_SCHEMA = {
  LOGIN: {
      url: '/user/login?_format=json',
      method: 'post',
      schema: object().shape({
        token: string().required(),
        info: object().shape({
          name: string().required(),
          id: string().required()
        }).required()
      }),
      query: `res.data.{
        token: csrf_token,
        info: {
          name: current_user.name,
          id: current_user.uid
        }
      }
    `
  }
}

export const PAGES_QUERIES_SCHEMA = {
  GET: {
    url: 'api/events',
    method: 'get',
    schema: array().of(
      object().shape(
        {
          content: string().required(),
          name: string().required(),
          path: string().required()
        }
      ).required()
    ).min(2),
    query: `res.data[].{
        content: body[0].value,
        name: title[0].value,
        path: title[0].value
      }
    `
  }
}
