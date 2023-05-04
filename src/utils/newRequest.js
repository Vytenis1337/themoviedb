import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://themoviedb-backend.onrender.com/',
  withCredentials: true,
  crossDomain: true,
});

export default newRequest;
