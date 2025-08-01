# -PWA---News
**PWA - News** es una aplicación web progresiva que consume la API de [NewsAPI.org](https://newsapi.org) para mostrar noticias actualizadas. Permite buscar por palabras clave, filtrar por categorías y recibir actualizaciones en tiempo real gracias a la implementación de Service Workers.

---

## 📌 Funcionalidades principales
- Consulta de noticias de distintas categorías: Tecnología, Deportes, Entretenimiento, Salud, Ciencia.
- Búsqueda personalizada de artículos.
- Actualización automática cada 10 minutos.
- Funcionamiento offline básico gracias a **Service Workers**.
- Instalación como aplicación en dispositivos móviles o escritorio.
- Interfaz responsiva y amigable.

---

## 🚀 Tecnologías utilizadas
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js + Express
- **API**: NewsAPI
- **PWA**: Service Workers, manifest.json
- **Otras librerías**: Axios, Dotenv, CORS

---

## 🏗 Arquitectura
- **Frontend**: Interfaz web con HTML, CSS y JavaScript.
- **Backend**: Node.js para consumo de la API y manejo de peticiones.
- **PWA**: Service Workers para cacheo y soporte offline.
- **Hosting**: Local con posibilidad de despliegue.

---

## 📂 Instalación y configuración
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/HugoLavoe/pwa-news.git

## Instalar dependencias:
bash
npm install

Configurar archivo .env con tu clave de NewsAPI:
env
NEWS_API_KEY=tu_api_key_aqui

Iniciar servidor:
bash
node server.js

👤 Autor
Desarrollado por Víctor Hugo Pérez Tépox
Ingeniero en Desarrollo y Gestion de Software
📧 vector.hugopt@gmail.com | 🌐 LinkedIn
