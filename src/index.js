import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './assets/fonts/fonts.css'; // Импортируем шрифты

// Добавляем обработчик для предотвращения скроллинга
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  
  // Предотвращаем скроллинг колесиком мыши
  document.addEventListener('wheel', preventScroll, { passive: false });
  
  // Предотвращаем скроллинг на мобильных устройствах
  document.addEventListener('touchmove', preventScroll, { passive: false });
  
  function preventScroll(e) {
    e.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

