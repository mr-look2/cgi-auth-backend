const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simulerad login-endpoint
app.post('/login', (req, res) => {
    const { serviceId, accessToken } = req.body;
    
    if (!serviceId || !accessToken) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    // Validera mot testuppgifterna
    const validCredentials = {
        "cgitest001": "01010101-0101-0101-0101-010101010101",
        "cgitest002": "02020202-0202-0202-0202-020202020202",
        "cgitest003": "03030303-0303-0303-0303-030303030303"
    };

    if (validCredentials[serviceId] === accessToken) {
        return res.json({ message: 'Login successful!' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
