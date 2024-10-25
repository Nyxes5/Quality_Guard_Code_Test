import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/', // TODO: Temporary since problems with CORS
  // baseURL: 'https://guardian-api.qguard.be/api/',
  // headers: {
  //   'Qguard-API-Key': '59017889d3074a039714240b806c5d3d', // Normally this would be in a secret variable but since this is a test environment, I will just keep it here
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Accept': '*/*',
  // }
})

export { api }
