const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enkel test-route
app.get('/', (req, res) => {
    res.send('CGI Auth Backend is running!');
});

// Placeholder för autentisering
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Här skulle du anropa CGI:s API för autentisering
    res.json({ message: 'Login endpoint hit', username });
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
