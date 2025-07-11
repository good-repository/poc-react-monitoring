import axios from 'axios';

export async function fetchWithError() {
  // This endpoint will return a 404 error
  return axios.get('https://jsonplaceholder.typicode.com/404-endpoint');
}
