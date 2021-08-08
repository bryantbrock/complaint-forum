import {writable} from 'svelte/store'
import {getUrlParams} from './util/misc'

const baseUrl = "https://api.airtable.com/v0/appqX92uDE5P8alZM"

const createFetcher = table => async ({
  method = 'GET',
  params = '',
  id = '',
  data = {}
} = {}) => {
  const userId = localStorage.getItem('userId')
  const sessionId = localStorage.getItem('sessionId')
  const urlParams = getUrlParams()
  const authenticationPages = ['signin', 'signup']

  if ((!userId || !sessionId) && !authenticationPages.includes(urlParams.page)) {
    console.error('Signed out. Redirecting.')

    localStorage.clear()
    window.location.search = '?page=signin'
  }

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
    params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  }

  const res = await fetch(baseUrl + `/${table}${id ? '/' + id : ''}?` + params, extras)

  return res.json()
}

export const Complaints = createFetcher('Complaints')
export const Comments = createFetcher('Comments')
export const Threads = createFetcher('Threads')
export const Users = createFetcher('Users')