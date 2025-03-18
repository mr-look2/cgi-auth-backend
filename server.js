const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Login-endpoint som anropar CGI:s API
app.post('/login', async (req, res) => {
    const { serviceId, accessToken } = req.body;
    
    if (!serviceId || !accessToken) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    try {
        const response = await axios.post('https://eid-connect.test.funktionstjanster.se/', {
            serviceId,
            accessToken
        });

        return res.json(response.data);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid credentials or error contacting authentication service' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
