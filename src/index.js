import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";


const baseURL = "https://954agpq9fl.execute-api.us-east-1.amazonaws.com/dev";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default axiosInstance;
 

