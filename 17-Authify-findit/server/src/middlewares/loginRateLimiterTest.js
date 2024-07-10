// node src/middlewares/loginRateLimiterTest.js

import axios from 'axios';

const testLoginRateLimiter = async () => {
    const url = 'http://localhost:3000/api/user/login';
    const incorrectCredentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
    };
    const correctCredentials = {
        email: 'test1@gmail.com',
        password: 'test1@gmail.com', 
    };

    console.log("Testing incorrect credentials:");
    for (let i = 1; i <= 50; i++) {
        try {
            const response = await axios.post(url, incorrectCredentials);
            console.log(`Attempt ${i}: Status ${response.status} - ${JSON.stringify(response.data)}`);
        } catch (error) {
            if (error.response) {
                console.log(`Attempt ${i}: Status ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                if (error.response.status === 429) {
                    console.log("Rate limit reached as expected.");
                    break;
                }
            } else {
                console.log(`Attempt ${i}: Error - ${error.message}`);
            }
        }
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("\nTesting correct credentials:");
    try {
        const response = await axios.post(url, correctCredentials);
        console.log(`Correct login attempt: Status ${response.status} - ${JSON.stringify(response.data)}`);
    } catch (error) {
        if (error.response) {
            console.log(`Correct login attempt: Status ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
            console.log(`Correct login attempt: Error - ${error.message}`);
        }
    }
};

testLoginRateLimiter();