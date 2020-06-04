import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default Api;
