const httpAgent = require('../lib/agent');
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
});

export const getUsers = async () => {
    try {
        let result = await instance({
            url : '/users',
            method : 'get',
            httpAgent : httpAgent
        });
        return result;
    } catch (err) {
        console.log('err', err);
        process.exit(0);
    }
};