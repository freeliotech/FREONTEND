// // src/config/api.js
// import axios from "axios";

// export const ApiContext = import.meta.env.VITE_API_URL;

// ✅ Use absolute URL for production
const getApiUrl = () => {
  // Production - use Railway backend
  if (import.meta.env.MODE === 'production') {
    return 'https://sanujbackendttic.up.railway.app/api';
  }
  
  // Development - use localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

export const ApiContext = getApiUrl();

// Debug
console.log(`🔗 [${import.meta.env.MODE}] API_URL:`, ApiContext);