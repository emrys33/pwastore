import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://94.130.112.86/'
})

export default instance;