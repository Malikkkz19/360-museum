import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaVk, FaTelegram, FaYoutube, FaInstagram } from "react-icons/fa";

// Импортируем изображения залов
import hall1 from "../../assets/halls/1.png";
import hall2 from "../../assets/halls/2.png";
import hall3 from "../../assets/halls/3.png";
import hall4 from "../../assets/halls/4.png";
import hall5 from "../../assets/halls/5.png";
import hall6 from "../../assets/halls/6.png";
// Импортируем изображения ракет и планеты
import whiteRocket from "../../assets/halls/white_rocket.png";
import yellowRocket from "../../assets/halls/yellow_rocket.png";
import planet from "../../assets/halls/planet.png";
// Импортируем изображения для слайд-шоу
import museumImage1 from "../../assets/halls/vka.jpg";
// Удаляем импорт звезд
// import logoLeft from '../../assets/logo-left.png';
// import logoRight from '../../assets/logo-right.png';

const halls = [
  {
    id: "room1",
    name: "ЗАЛ 1",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall1,
  },
  {
    id: "room2",
    name: "ЗАЛ 2",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall2,
  },
  {
    id: "room3",
    name: "ЗАЛ 3",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall3,
  },
  {
    id: "room4",
    name: "ЗАЛ 4",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall4,
  },
  {
    id: "room5",
    name: "ЗАЛ 5",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall5,
  },
  {
    id: "room6",
    name: "ЗАЛ 6",
    description: "НАИМЕНОВАНИЕ ЗАЛА",
    image: hall6,
  },
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
    navigate("/map");
  };

  const handleRoomDescriptionsClick = () => {
    // Действие для кнопки "ОПИСАНИЕ ЗАЛОВ"
    navigate("/room-descriptions");
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

      {/* Ракеты и планета на фоне (уменьшенные) */}
      <div className="white-rocket small-icon">
        <img src={whiteRocket} alt="Белая ракета" />
      </div>

      {/* Планета в правом верхнем углу (уменьшенная) */}
      <div className="planet small-icon">
        <img src={planet} alt="Планета" />
      </div>

      {/* Временно скрываем логотипы */}
      {/* <div className="logo-left">
        <img src={logoLeft} alt="Лого" />
      </div> */}

      <header className="landing-header elevated">
        <h1>МУЗЕЙ</h1>
        <h2>ВОЕННО - КОСМИЧЕСКОЙ АКАДЕМИИ</h2>
        <h2>ИМЕНИ А.Ф. МОЖАЙСКОГО</h2>
      </header>

      <section className="landing-main">
        <div className="virtual-tour-wrapper">
          <h3 className="virtual-tour-title">ВИРТУАЛЬНОЕ ПУТЕШЕСТВИЕ</h3>
          <div className="virtual-tour-title-underline"></div>
        </div>

        {/* Слайд-шоу с изображениями музея */}
        <div className="museum-slideshow">
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            interval={5000}
            transitionTime={1000}
          >
            <div>
              <img src={museumImage1} alt="Музей" />
              <p className="legend">Музей Военно-космической академии</p>
            </div>
            <div>
              <img src={hall1} alt="Зал 1" />
              <p className="legend">Зал 1</p>
            </div>
            <div>
              <img src={hall2} alt="Зал 2" />
              <p className="legend">Зал 2</p>
            </div>
            <div>
              <img src={hall3} alt="Зал 3" />
              <p className="legend">Зал 3</p>
            </div>
          </Carousel>
        </div>

        {/* Левая колонка с залами 1-3 */}
        <div className="halls-left">
          {halls.slice(0, 3).map((hall) => (
            <div
              key={hall.id}
              className="hall-card"
              onClick={() => handleHallClick(hall.id)}
            >
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

        {/* Правая колонка с залами 4-6 */}
        <div className="halls-right">
          {halls.slice(3, 6).map((hall) => (
            <div
              key={hall.id}
              className="hall-card"
              onClick={() => handleHallClick(hall.id)}
            >
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

        <div className="landing-footer">
          <button className="map-button" onClick={handleMapClick}>
            КАРТА МУЗЕЯ
          </button>
          <button
            className="room-descriptions-button"
            onClick={handleRoomDescriptionsClick}
          >
            ОПИСАНИЕ ЗАЛОВ
          </button>
        </div>
      </section>

      {/* Кнопки контактов внизу справа */}
      <div className="social-contacts">
        <a
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaVk />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaTelegram />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaYoutube />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Временно скрываем логотипы */}
      {/* <div className="logo-right">
        <img src={logoRight} alt="Лого" />
      </div> */}
    </div>
  );
}

export default LandingPage;
