import axios from 'axios';

export const home = axios.create({
    baseURL: 'https://www.ibridge.com.br/dados.json'
});