import axios from 'axios'

const api = axios.create({
  baseURL: 'https://guardian-api.qguard.be/api',
  headers: {
    'Qguard-API-Key': '59017889d3074a039714240b806c5d3d', // Normally this would be in a secret variable but since this is a test environment, I will just keep it here
  },
});

export { api };
