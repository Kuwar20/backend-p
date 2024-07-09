//to send data to register endpoint using bruteforce
// run this file with : 'node src/middlewares/rateLimiterCheck.js' in server file

import axios from 'axios';

const dataForRegisterCheck = async () => {
    const url = 'http://localhost:3000/api/user/register'
    const request = [];

    for (let i = 0; i < 20; i++) { // Send more requests than the limit to test
        request.push(
            axios.post(url, {
                firstName: `firstName${i}`,
                lastName: `lastName${i}`,
                email: `email${i}@gmail.com`,
                password: `password`
            }).then(response => {
                console.log(`User ${i} registered successfully:`, response.data.message);
            }).catch(error => {
                if (error.response && error.response.status === 429) {
                    console.log('Rate limit exceeded:', error.response.data);
                } else {
                    console.log('Request error:', error.message);
                }
            })
        );
        // Adding a slight delay between requests (optional but recommended)
        //await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    }

    await Promise.all(request);
};

dataForRegisterCheck();