const baseUrl = "https://api.airtable.com/v0/appqX92uDE5P8alZM"

const createFetcher = endpoint => async ({
  method = 'GET',
  params = '',
  id = '',
  data = {}
} = {}) => {
  const extras = {
    headers: {
      'Authorization': 'Bearer keyzUCHpYPPnsmwWX',
      'Content-Type': 'application/json',
    },
    method,
  };

  if (method !== 'GET') {
    extras.body = JSON.stringify(data)
  }

  if (!!params) {
    params = Object.keys(params).map(function(key) {
      return key + '=' + params[key];
    }).join('&');
  }

  const res = await fetch(baseUrl + `/${endpoint}${id ? '/' + id : ''}?` + params, extras)

  return res.json()
}

export const Complaints = createFetcher('Complaints')
export const Comments = createFetcher('Comments')
export const Users = createFetcher('Users')