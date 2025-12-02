// frontend/src/config.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://estetica-backend-wheat.vercel.app' // <--- ¡AQUÍ ESTÁ TU URL!
  : 'https://localhost:5000';

export default API_URL;