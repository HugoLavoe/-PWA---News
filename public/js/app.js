const API_URL = 'http://localhost:3000'; // URL del servidor backend

// Función genérica para mostrar noticias
function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    if (articles && articles.length > 0) {
        newsContainer.innerHTML = articles.map(article => `
            <div class="news-item">
                <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                <p>${article.description || 'Descripción no disponible.'}</p>
            </div>
        `).join('');
    } else {
        displayNoArticlesMessage();
    }
}

// Mostrar mensaje si no hay artículos
function displayNoArticlesMessage() {
    document.getElementById('newsContainer').innerHTML = '<p>No se encontraron artículos.</p>';
}

// Mostrar mensaje de error
function displayErrorMessage() {
    document.getElementById('newsContainer').innerHTML = '<p>Hubo un error al cargar las noticias.</p>';
}

// Obtener noticias iniciales (por defecto)
const fetchNews = async (category = '', query = '') => {
    try {
        // Construir URL con parámetros
        const response = await fetch(`${API_URL}/api/news?category=${category}&query=${query}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            displayNoArticlesMessage();
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        displayErrorMessage();
    }
};

// Llamada al cargar la página (noticias generales)
document.addEventListener("DOMContentLoaded", () => {
    fetchNews(); // Noticias generales
        // Actualizar las noticias cada 10 minutos (600000 ms)
    setInterval(() => {
        fetchNews(); // Vuelve a cargar las noticias generales
    }, 600000); // 600000 ms = 10 minutos

});

// Filtrar noticias por categoría
async function fetchNewsByCategory(category) {
    fetchNews(category, '');
}

// Buscar noticias por palabra clave
async function searchNews() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    fetchNews('', query);
}

// Event listeners para filtros y búsqueda
document.addEventListener('DOMContentLoaded', () => {
    fetchNews(); // Noticias iniciales

    // Búsqueda de noticias
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', searchNews);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') searchNews();
        });
    }

    // Filtrado por categoría
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            const category = categorySelect.value;
            fetchNewsByCategory(category);
        });
    }
});
