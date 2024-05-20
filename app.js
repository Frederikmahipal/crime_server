const express = require('express');
const app = express();
const cron = require('node-cron');
const axios = require('axios');
const generateCrime = require('./generate_crimes');
const jwt = require('jsonwebtoken');


const port = 3000;

app.use(express.json());

let crimes = [];

// Generate a new crime every 5 seconds

cron.schedule('0 */3 * * *', () => {
    let crime = generateCrime();
    console.log('generated crime');
    crimes.push(crime);
});

// Endpoint to get all crimes
app.get('/get-crimes', (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, 'secret-key', (err) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            res.json(crimes);
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
});

/*
cron.schedule('* * * * * *', () => {
    let crime = generateCrime();
    axios.post('http://localhost:8000/get-crimes', crime)
        .then(res => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch(err => {
            console.error(err);
        });
});
*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 


