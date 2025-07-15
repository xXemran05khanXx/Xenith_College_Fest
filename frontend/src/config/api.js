// API Base URL configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use same domain in production (since backend serves frontend)
  : 'http://localhost:5000'; // Use localhost in development

export default API_BASE_URL;
