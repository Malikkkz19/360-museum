import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaVk,
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaTimes,
} from "react-icons/fa";

import hall1 from "../../assets/halls/1.png";
import hall2 from "../../assets/halls/2.png";
import hall3 from "../../assets/halls/3.png";
import hall4 from "../../assets/halls/4.png";
import hall5 from "../../assets/halls/5.png";
import hall6 from "../../assets/halls/6.png";
import whiteRocket from "../../assets/halls/white_rocket.png";
import yellowRocket from "../../assets/halls/yellow_rocket.png";
import planet from "../../assets/halls/planet.png";
import museumImage1 from "../../assets/halls/vka.jpg";

const halls = [
  {
    id: "room1",
    name: "ЗАЛ 1",
    description: "Посвящен периоду с 1712 по 1918г.",
    image: hall1,
  },
  {
    id: "room2",
    name: "ЗАЛ 2",
    description: "Посвящён периоду с 1918 по 1941г.",
    image: hall2,
  },
  {
    id: "room3",
    name: "ЗАЛ 3",
    description: "Посвящен периоду c 1941 по 1957г.",
    image: hall3,
  },
  {
    id: "room4",
    name: "ЗАЛ 4",
    description: "Космический зал",
    image: hall4,
  },
  {
    id: "room5",
    name: "ЗАЛ 5",
    description: "Зал славы",
    image: hall5,
  },
  {
    id: "room6",
    name: "ЗАЛ 6",
    description: "Лекционный зал",
    image: hall6,
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedMuseum");
    if (!hasVisitedBefore) {
      setTimeout(() => {
        setShowWelcomeModal(true);
        localStorage.setItem("hasVisitedMuseum", "true");
      }, 500);
    }
  }, []);

  const handleHallClick = (hallId) => {
    navigate(`/tour/${hallId}`);
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  const handleRoomDescriptionsClick = () => {
    navigate("/room-descriptions");
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const resetWelcomeModal = () => {
    localStorage.removeItem("hasVisitedMuseum");
    window.location.reload();
  };

  return (
    <div className="landing-page">
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

      <div className="white-rocket small-icon-rocket">
        <img src={whiteRocket} alt="Белая ракета" />
      </div>

      <div className="planet small-icon-planet">
        <img src={planet} alt="Планета" />
      </div>

      <header className="landing-header elevated">
        <h1>МУЗЕЙ ИСТОРИИ</h1>
        <h2>ВОЕННО - КОСМИЧЕСКОЙ АКАДЕМИИ</h2>
        <h2>ИМЕНИ А.Ф. МОЖАЙСКОГО</h2>
      </header>

      <section className="landing-main">
        <div className="virtual-tour-wrapper">
          <h3 className="virtual-tour-title">ВИРТУАЛЬНОЕ ПУТЕШЕСТВИЕ</h3>
          <div className="virtual-tour-title-underline"></div>
        </div>

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
          href="https://vk.com/vka_spb"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaVk />
        </a>
        <a
          href="https://t.me/vka_spb"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaTelegram />
        </a>
        <a
          href="https://www.youtube.com/@vka_spb"
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

      {/* Временная кнопка для тестирования приветствия */}
      <button
        onClick={resetWelcomeModal}
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          zIndex: 999,
          background: "#2a3f5f",
          color: "#fff",
          border: "1px solid #f5a623",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Сбросить приветствие
      </button>

      {showWelcomeModal && (
        <div className="welcome-modal-overlay" onClick={closeWelcomeModal}>
          <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
            <button className="welcome-modal-close" onClick={closeWelcomeModal}>
              <FaTimes />
            </button>

            <div className="welcome-modal-content">
              <div className="welcome-modal-header">
                <div className="welcome-modal-title-container">
                  <h2 className="welcome-modal-title">Добро пожаловать</h2>
                  <div className="welcome-modal-subtitle">
                    в виртуальный музей истории
                  </div>
                </div>

                <div className="welcome-modal-academy-title">
                  Военно-космической академии
                  <br />
                  имени А.Ф. Можайского
                </div>
              </div>

              <div className="welcome-modal-divider">
                <div className="welcome-modal-rocket">
                  <img src={yellowRocket} alt="Ракета" />
                </div>
              </div>

              <div className="welcome-modal-text">
                <p>
                  Приветствуем вас в виртуальном пространстве музея истории
                  Военно-космической академии имени А.Ф. Можайского – старейшего
                  военно-учебного заведения России, основанного в 1712 году.
                </p>
                <p>
                  Здесь вы можете совершить увлекательное путешествие по залам
                  музея, познакомиться с уникальными экспонатами и узнать об
                  истории становления и развития отечественной космонавтики и
                  ракетостроения.
                </p>
                <p>
                  Выберите интересующий вас зал на главной странице или
                  воспользуйтесь картой музея для навигации по виртуальному
                  пространству.
                </p>
              </div>

              <button
                className="welcome-modal-button"
                onClick={closeWelcomeModal}
              >
                Начать виртуальное путешествие
              </button>
            </div>

            <div className="welcome-modal-stars">
              {[...Array(15)].map((_, index) => (
                <div
                  key={index}
                  className={`modal-star-dot modal-star-${index + 1}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
