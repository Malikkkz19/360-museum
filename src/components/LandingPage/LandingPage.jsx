import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Импортируем изображения залов
import hall1 from '../../assets/halls/1.png';
import hall2 from '../../assets/halls/2.png';
import hall3 from '../../assets/halls/3.png';
import hall4 from '../../assets/halls/4.png';
import hall5 from '../../assets/halls/5.png';
import hall6 from '../../assets/halls/6.png';
// Импортируем изображения ракет и планеты
import whiteRocket from '../../assets/halls/white_rocket.png';
import yellowRocket from '../../assets/halls/yellow_rocket.png';
import planet from '../../assets/halls/planet.png';
// Удаляем импорт звезд
// import logoLeft from '../../assets/logo-left.png';
// import logoRight from '../../assets/logo-right.png';

const halls = [
  { id: 'room1', name: 'ЗАЛ 1', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall1 },
  { id: 'room2', name: 'ЗАЛ 2', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall2 },
  { id: 'room3', name: 'ЗАЛ 3', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall3 },
  { id: 'room4', name: 'ЗАЛ 4', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall4 },
  { id: 'room5', name: 'ЗАЛ 5', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall5 },
  { id: 'room6', name: 'ЗАЛ 6', description: 'НАИМЕНОВАНИЕ ЗАЛА', image: hall6 },
];

function LandingPage() {
  const navigate = useNavigate();

  const handleHallClick = (hallId) => {
    // При клике переходим в нужный зал
    navigate(`/tour/${hallId}`);
  };

  const handleMapClick = () => {
    // Действие для кнопки "КАРТА МУЗЕЯ"
    // Можно переход к общей карте или к первому залу
    navigate('/map');
  };

  return (
    <div className="landing-page">
      {/* Мерцающие точки-звезды на фоне */}
      <div className="twinkling-stars">
        <div className="star-dot star-dot-1"></div>
        <div className="star-dot star-dot-2"></div>
        <div className="star-dot star-dot-3"></div>
        <div className="star-dot star-dot-4"></div>
        <div className="star-dot star-dot-5"></div>
        <div className="star-dot star-dot-6"></div>
        <div className="star-dot star-dot-7"></div>
        <div className="star-dot star-dot-8"></div>
        <div className="star-dot star-dot-9"></div>
        <div className="star-dot star-dot-10"></div>
        <div className="star-dot star-dot-11"></div>
        <div className="star-dot star-dot-12"></div>
        <div className="star-dot star-dot-13"></div>
        <div className="star-dot star-dot-14"></div>
        <div className="star-dot star-dot-15"></div>
        <div className="star-dot star-dot-16"></div>
        <div className="star-dot star-dot-17"></div>
        <div className="star-dot star-dot-18"></div>
        <div className="star-dot star-dot-19"></div>
        <div className="star-dot star-dot-20"></div>
        <div className="star-dot star-dot-21"></div>
        <div className="star-dot star-dot-22"></div>
        <div className="star-dot star-dot-23"></div>
        <div className="star-dot star-dot-24"></div>
        <div className="star-dot star-dot-25"></div>
      </div>
      
      {/* Ракеты и планета на фоне */}
      <div className="white-rocket">
        <img src={whiteRocket} alt="Белая ракета" />
      </div>
      
      {/* Планета в правом верхнем углу */}
      <div className="planet">
        <img src={planet} alt="Планета" />
      </div>
      
      {/* Временно скрываем логотипы */}
      {/* <div className="logo-left">
        <img src={logoLeft} alt="Лого" />
      </div> */}
      
      <header className="landing-header">
        <h1>МУЗЕЙ</h1>
        <h2>ВОЕННО - КОСМИЧЕСКОЙ АКАДЕМИИ</h2>
        <h2>ИМЕНИ А.Ф. МОЖАЙСКОГО</h2>
      </header>
      
      <section className="landing-main">
        <div className="virtual-tour-wrapper">
          <h3 className="virtual-tour-title">ВИРТУАЛЬНЫЙ ТУР</h3>
          <div className="virtual-tour-title-underline"></div>
        </div>
        
        <div className="halls-grid">
          {halls.map((hall) => (
            <div key={hall.id} className="hall-card" onClick={() => handleHallClick(hall.id)}>
              <div className="hall-image-container">
                <img src={hall.image} alt={hall.name} className="hall-image" />
              </div>
              <div className="hall-info">
                <p className="hall-name">{hall.name}</p>
                <p className="hall-description">{hall.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="map-button-container" onClick={handleMapClick}>
          <button className="map-button">
            КАРТА МУЗЕЯ
          </button>
        </div>
      </section>
      
      {/* Временно скрываем логотипы */}
      {/* <div className="logo-right">
        <img src={logoRight} alt="Лого" />
      </div> */}
    </div>
  );
}

export default LandingPage;