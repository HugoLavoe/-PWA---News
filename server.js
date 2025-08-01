require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener noticias
app.get('/api/news', async (req, res) => {
    try {
        const { category, query } = req.query;
        const apiKey = process.env.NEWS_API_KEY;
        const countryParam = 'us'; // Cambia el código del país según sea necesario

        // Construcción de la URL
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
        if (!category && !query) {
            url += `&country=${countryParam}`; // Noticias generales
        } else {
            if (category && category !== 'all') {
                url += `&category=${category}`;
            }
            if (query) {
                url += `&q=${query}`;
            }
        }

        console.log('URL construida para la API:', url);

        // Realizar la solicitud a la News API
        const response = await axios.get(url);

        if (response.data.articles && response.data.articles.length > 0) {
            res.json(response.data); // Enviar los artículos al frontend
        } else {
            res.status(404).json({ message: 'No se encontraron artículos.' });
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Error al obtener noticias.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
