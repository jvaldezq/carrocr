import axios from 'axios';

export const clientApi = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
});