const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const generateCrime = require('./generate_crimes');

const port = 3000;

app.use(express.json());
let crimes = [];

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

app.get('/update-crimes', (req, res) => {
    const newCrime = generateCrime();
    crimes.push(newCrime);
    res.status(200).json({ message: 'Crimes updated successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});