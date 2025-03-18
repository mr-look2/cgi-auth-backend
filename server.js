const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const CGI_AUTH_URL = 'https://eid-connect.test.funktionstjanster.se/';

app.post('/login', async (req, res) => {
    const { serviceId, accessToken } = req.body;
    
    if (!serviceId || !accessToken) {
        return res.status(400).json({ error: 'ServiceID och accessToken krävs' });
    }
    
    try {
        const response = await axios.post(CGI_AUTH_URL, {
            serviceId,
            accessToken
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Autentisering misslyckades', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});
