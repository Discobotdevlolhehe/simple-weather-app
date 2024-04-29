const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const apiKey = process.env.API_KEY; // Your OpenWeatherMap API key

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});