// just install axios in your project and use this command to test without calling this file in index: 
// run this file with : 'node src/middlewares/rateLimiterChecker.js'

import axios from 'axios';

const testRateLimit = async () => {
    const url = 'http://localhost:3000/api/user/signup'; // Adjust the URL to your endpoint
    const requests = [];

    for (let i = 0; i < 110; i++) { // Send more requests than the limit to test
        requests.push(
            axios.post(url, {
                name: `User${i}`,
                email: `user${i}@example.com`,
                password: 'password'
            }).catch(error => {
                if (error.response && error.response.status === 429) {
                    console.log('Rate limit exceeded:', error.response.data);
                } else {
                    console.log('Request error:', error.message);
                }
            })
        );
    }

    await Promise.all(requests);
};

testRateLimit();
