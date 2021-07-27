const baseUrl = "https://api.airtable.com/v0/appqX92uDE5P8alZM"


const createFetcher = endpoint => async ({
  method = 'GET',
  params = '',
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

  const res = await fetch(baseUrl + `/${endpoint}/` + params, extras)

  return res.json()
}


export const Complaints = createFetcher('Complaints')
export const Comments = createFetcher('Comments')
export const Users = createFetcher('Users')