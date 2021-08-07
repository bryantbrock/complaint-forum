import {user} from './store';
import {Users} from "./client.js";

// User Actions
export const getUser = async () => {
  const userId = localStorage.getItem('userId');
  const sessionId = localStorage.getItem('sessionId');

  const {records: [newUser]} = await Users({
    params: {
      'maxRecords': 1,
      'filterByFormula': `SEARCH('${userId}', {id})`,
      'filterByFormula': `SEARCH('${sessionId}', {sessionId})`
    }
  });

  if (!!newUser && newUser.hasOwnProperty('id')) {
    user.set(newUser)
  }
}