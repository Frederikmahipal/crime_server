const express = require('express');
const app = express();
const cron = require('node-cron');
const axios = require('axios');
const generateCrime = require('./generate_crimes');

const port = 3000;

app.use(express.json());

//5 secs
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 


