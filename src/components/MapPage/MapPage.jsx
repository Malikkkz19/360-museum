import React from "react";
import { useNavigate } from "react-router-dom";
import "./MapPage.css";
import yellowRocket from "../../assets/halls/yellow_rocket.png";
import museumScheme from "../../assets/halls/scheme.svg";

function MapPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="map-page">
      <div className="twinkling-stars">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={`star-${i}`} className={`star-dot star-dot-${i + 1}`}></div>
        ))}
      </div>

      <div className="map-content">
        {/* Заголовок */}
        <div className="map-header">
          <div className="map-title">
            <h1>КАРТА</h1>
            <div className="map-logo">
              <img src={yellowRocket} alt="Ракета" />
            </div>
            <h1>МУЗЕЯ</h1>
          </div>
        </div>

        <div className="museum-map">
          <img src={museumScheme} alt="Схема музея" className="museum-scheme" />
        </div>

        <div className="map-footer">
          <button className="map-back-button" onClick={handleBackClick}>
            <span className="back-arrow">←</span>
            <span className="back-text">назад</span>
          </button>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-dot"></div>
              <div className="legend-text">точка для перемещения</div>
            </div>
            <div className="legend-item">
              <div className="legend-selected-dot"></div>
              <div className="legend-text">выбранная точка для перемещения</div>
            </div>
            <div className="legend-item">
              <div className="legend-exhibit"></div>
              <div className="legend-text">стенд с экспонатами</div>
            </div>
            <div className="legend-item">
              <div className="legend-screen"></div>
              <div className="legend-text">интерактивный экран</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
