const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
  res.send('🌦️ Weather API is running...');
});

// Weather route
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;  // ✅ Correct way

    if (!apiKey) {
      return res.status(401).json({
        cod: 401,
        message: "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    res.json({
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    });
  } catch (error) {
    res.status(401).json({
      cod: 401,
      message: "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
