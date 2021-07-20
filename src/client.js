const baseUrl = "https://api.airtable.com/v0/appqX92uDE5P8alZM"
// Tables
export const Complaints = ({method = 'GET', params = '', data = {}}) =>
  fetch(baseUrl + '/Complaints/' + params, {
    headers: {
      'Authorization': 'Bearer keyzUCHpYPPnsmwWX',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method,
  }).then(res => res.json())
