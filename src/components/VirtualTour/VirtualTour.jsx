import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Marzipano from "marzipano";
import "./VirtualTour.css";
import "./VirtualTourResponsive.css";
import yellowRocket from "../../assets/halls/yellow_rocket.png";

const VirtualTour = () => {
  const panoRef = useRef(null);
  const { hallId } = useParams();
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState("");

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipFading, setTooltipFading] = useState(false);

  const [isRoomDescriptionOpen, setIsRoomDescriptionOpen] = useState(false);
  const [roomDescription, setRoomDescription] = useState({
    title: "Космический зал",
    description:
      "Этот зал посвящен истории космонавтики и исследованию космического пространства. Здесь представлены модели космических кораблей, скафандры, фотографии космонавтов и другие экспонаты, связанные с освоением космоса.",
    images: [
      "/images/Image1.jpg",
      "/images/Image2.jpg",
      "/images/room3.jpg",
      "/images/room4.jpg",
      "/images/canada.jpg",
      "/images/room3.jpg",
    ],
  });

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    const hideTimeout = setTimeout(() => {
      setTooltipFading(true);

      setTimeout(() => {
        setShowTooltip(false);
        setTooltipFading(false);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    console.log("Загрузка тура для зала:", hallId);

    const scenes = [
      {
        id: "room1",
        name: "Позиция 1",
        imageUrl: "/images/Image1.jpg",
        linkHotspots: [
          {
            yaw: 1.9,
            pitch: 0.1,
            target: "room2",
            description: "Перейти в Позиция 2",
          },
        ],
        infoHotspots: [
          {
            yaw: 2.5,
            pitch: 0,
            title: 'Экспонат "Космический корабль"',
            info: '<p>Этот экспонат представляет собой модель космического корабля "Союз", который использовался для доставки космонавтов на орбитальные станции.</p><p>Корабль "Союз" - самый надежный пилотируемый космический корабль в истории космонавтики, эксплуатирующийся с 1967 года по настоящее время.</p>',
            gallery: [
              "/images/Image1.jpg",
              "/images/Image2.jpg",
              "/images/room3.jpg",
              "/images/room4.jpg",
              "/images/canada.jpg",
              "/images/room3.jpg",
            ],
            video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            yaw: 0.8,
            pitch: -0.2,
            title: "Исторические фотографии",
            info: "<p>Коллекция исторических фотографий, демонстрирующих важные моменты в истории космонавтики и развития космической техники.</p>",
            gallery: [
              "/images/Image1.jpg",
              "/images/Image2.jpg",
              "/images/room3.jpg",
            ],
          },
        ],
        imageHotspots: [
          {
            yaw: 0.5,
            pitch: -0.1,
            imageUrl: "/images/canada.jpg",
          },
        ],
        videoHotspots: [
          {
            yaw: 1.2,
            pitch: 0.3,
            videoUrl: "/videos/lion.mp4",
          },
        ],
      },
      {
        id: "room2",
        name: "Позиция 2",
        imageUrl: "/images/Image2.jpg",
        linkHotspots: [
          {
            yaw: -1.5,
            pitch: 0,
            target: "room1",
            description: "Вернуться в Позицию 1",
          },
          {
            yaw: 1.0,
            pitch: 0,
            target: "room3",
            description: "Перейти в Позицию 3",
          },
        ],
      },
      {
        id: "room3",
        name: "Позиция 3",
        imageUrl: "/images/room3.jpg",
        linkHotspots: [
          {
            yaw: -1.0,
            pitch: 0,
            target: "room2",
            description: "Вернуться в Позицию 2",
          },
          {
            yaw: 1.0,
            pitch: 0,
            target: "room4",
            description: "Перейти в Позицию 4",
          },
        ],
      },
      {
        id: "room4",
        name: "Позиция 4",
        imageUrl: "/images/room4.jpg",
        linkHotspots: [
          {
            yaw: -1.0,
            pitch: 0,
            target: "room3",
            description: "Вернуться в Позицию 3",
          },
        ],
      },
    ];

    const viewerOpts = {
      controls: {
        mouseViewMode: "drag",
      },
    };

    const viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);
    const sceneMap = {};

    scenes.forEach((sceneData) => {
      const source = Marzipano.ImageUrlSource.fromString(sceneData.imageUrl);
      const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
      const limiter = Marzipano.RectilinearView.limit.traditional(
        2048,
        (120 * Math.PI) / 180
      );
      const view = new Marzipano.RectilinearView(
        { yaw: 0, pitch: 0, fov: 1.5 },
        limiter
      );

      const scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });

      sceneMap[sceneData.id] = { scene, view, data: sceneData };

      sceneData.linkHotspots.forEach((hotspot) => {
        const element = document.createElement("div");
        element.className = "hotspot-link";
        const tooltip = document.createElement("div");
        tooltip.className = "hotspot-tooltip";
        tooltip.textContent = hotspot.description;
        element.appendChild(tooltip);
        element.addEventListener("click", () => {
          switchScene(hotspot.target);
        });
        scene
          .hotspotContainer()
          .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      if (sceneData.infoHotspots) {
        sceneData.infoHotspots.forEach((hotspot) => {
          const element = document.createElement("div");
          element.className = "info-hotspot";

          const backdrop = document.createElement("div");
          backdrop.className = "info-tooltip-backdrop";

          const tooltip = document.createElement("div");
          tooltip.className = "info-tooltip";

          const header = document.createElement("h3");
          header.className = "info-tooltip-header";
          header.textContent = hotspot.title || "Информация";
          tooltip.appendChild(header);

          const closeButton = document.createElement("button");
          closeButton.className = "info-tooltip-close";
          closeButton.innerHTML = "&times;";
          closeButton.addEventListener("click", () => {
            tooltip.classList.remove("active");
            backdrop.classList.remove("active");
          });
          tooltip.appendChild(closeButton);

          if (hotspot.info) {
            const content = document.createElement("div");
            content.className = "info-tooltip-content";
            content.innerHTML = hotspot.info;
            tooltip.appendChild(content);
          }

          if (hotspot.gallery && hotspot.gallery.length > 0) {
            const gallery = document.createElement("div");
            gallery.className = "info-tooltip-gallery";

            hotspot.gallery.forEach((imgSrc) => {
              const img = document.createElement("img");
              img.className = "gallery-image";
              img.src = imgSrc;
              img.alt = "Галерея";

              img.addEventListener("click", () => {
                const lightbox = document.createElement("div");
                lightbox.style.position = "fixed";
                lightbox.style.top = "0";
                lightbox.style.left = "0";
                lightbox.style.width = "100%";
                lightbox.style.height = "100%";
                lightbox.style.backgroundColor = "rgba(0,0,0,0.9)";
                lightbox.style.display = "flex";
                lightbox.style.alignItems = "center";
                lightbox.style.justifyContent = "center";
                lightbox.style.zIndex = "2000";

                const fullImg = document.createElement("img");
                fullImg.src = imgSrc;
                fullImg.style.maxWidth = "90%";
                fullImg.style.maxHeight = "90%";
                fullImg.style.objectFit = "contain";

                lightbox.appendChild(fullImg);
                document.body.appendChild(lightbox);

                lightbox.addEventListener("click", () => {
                  document.body.removeChild(lightbox);
                });
              });

              gallery.appendChild(img);
            });

            tooltip.appendChild(gallery);
          }

          if (hotspot.video) {
            const videoContainer = document.createElement("div");
            videoContainer.className = "info-tooltip-video";

            if (
              hotspot.video.includes("youtube.com") ||
              hotspot.video.includes("youtu.be")
            ) {
              const iframe = document.createElement("iframe");
              iframe.src = hotspot.video.replace("watch?v=", "embed/");
              iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
              iframe.allowFullscreen = true;
              videoContainer.appendChild(iframe);
            } else if (hotspot.video.includes("vimeo.com")) {
              const iframe = document.createElement("iframe");
              iframe.src = hotspot.video.replace(
                "vimeo.com",
                "player.vimeo.com/video"
              );
              iframe.allow = "autoplay; fullscreen; picture-in-picture";
              iframe.allowFullscreen = true;
              videoContainer.appendChild(iframe);
            } else {
              const video = document.createElement("video");
              video.src = hotspot.video;
              video.controls = true;
              video.style.width = "100%";
              video.style.borderRadius = "5px";
              videoContainer.appendChild(video);
            }

            tooltip.appendChild(videoContainer);
          }

          document.body.appendChild(backdrop);
          document.body.appendChild(tooltip);

          element.addEventListener("click", () => {
            tooltip.classList.add("active");
            backdrop.classList.add("active");
          });

          scene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }

      if (sceneData.imageHotspots) {
        sceneData.imageHotspots.forEach((hotspot) => {
          const element = document.createElement("div");
          element.className = "image-hotspot";
          const tooltip = document.createElement("div");
          tooltip.className = "image-tooltip";
          const img = document.createElement("img");
          img.src = hotspot.imageUrl;
          tooltip.appendChild(img);
          element.appendChild(tooltip);
          scene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }

      if (sceneData.videoHotspots) {
        sceneData.videoHotspots.forEach((hotspot) => {
          const element = document.createElement("div");
          element.className = "video-hotspot";

          const tooltip = document.createElement("div");
          tooltip.className = "video-tooltip";
          const video = document.createElement("video");
          video.src = hotspot.videoUrl;
          video.setAttribute("muted", true);
          video.setAttribute("loop", true);
          video.setAttribute("playsinline", true);
          video.autoplay = true;
          video.muted = true;
          tooltip.appendChild(video);
          element.appendChild(tooltip);

          scene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }
    });

    function switchScene(id) {
      if (sceneMap[id]) {
        sceneMap[id].scene.switchTo();
        const sceneTitle = document.getElementById("scene-title");
        if (sceneTitle) {
          sceneTitle.textContent = sceneMap[id].data.name;
        }
        setCurrentScene(id);
      }
    }

    if (scenes.length > 0) {
      switchScene(scenes[0].id);
    }

    const sceneList = document.createElement("div");
    sceneList.className = "scene-list";
    scenes.forEach((scene) => {
      const item = document.createElement("div");
      item.className = "scene-item";
      item.textContent = scene.name;
      item.addEventListener("click", () => {
        switchScene(scene.id);
      });
      sceneList.appendChild(item);
    });
    panoRef.current.appendChild(sceneList);

    const sceneTitle = document.createElement("div");
    sceneTitle.id = "scene-title";
    sceneTitle.className = "scene-title";
    if (scenes.length > 0) {
      sceneTitle.textContent = scenes[0].name;
    }
    panoRef.current.appendChild(sceneTitle);

    return () => {
      viewer.destroy();
    };
  }, [hallId]);

  const toggleRoomDescription = () => {
    setIsRoomDescriptionOpen(!isRoomDescriptionOpen);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Функция для обратной связи
  const handleFeedbackClick = () => {
    alert("Функция обратной связи будет добавлена позже");
  };

  return (
    <div className="virtual-tour-container">
      <div ref={panoRef} className="pano-container"></div>

      <header className="tour-header">
        <button className="side-menu-toggle" onClick={toggleSideMenu}>
          <span className="menu-icon">
            <span></span>
          </span>
        </button>

        <div className="academy-title">
          Военно-космическая академия им. А.Ф. Можайского
        </div>

        <div className="academy-logo">
          <img src={yellowRocket} alt="Ракета" />
        </div>
      </header>

      <div className={`side-menu ${isSideMenuOpen ? "open" : ""}`}>
        <button className="side-menu-close" onClick={toggleSideMenu}>
          <span className="close-icon"></span>
        </button>

        <div className="side-menu-content">
          <h3 className="side-menu-title">Навигация</h3>

          <div className="side-menu-buttons">
            <button
              className="nav-button back-button"
              onClick={handleBackClick}
            >
              <span className="back-arrow">←</span>
              <span className="button-text">Назад</span>
            </button>

            <button
              className="nav-button home-button"
              onClick={handleHomeClick}
            >
              <span className="button-text">Главный экран</span>
            </button>

            <button className="nav-button map-button" onClick={handleMapClick}>
              <span className="button-text">Карта музея</span>
            </button>

            <button
              className="nav-button room-description-button"
              onClick={toggleRoomDescription}
            >
              <span className="button-text">Описание зала</span>
            </button>

            <button
              className="nav-button feedback-button"
              onClick={handleFeedbackClick}
            >
              <span className="button-text">Обратная связь</span>
            </button>
          </div>

          <div className="side-menu-map">
            <h4 className="side-menu-map-title">Схема зала</h4>
            <div className="room-map">
              <div className="room-map-outline">
                <div className="map-dot map-dot-1"></div>
                <div className="map-dot map-dot-2"></div>
                <div className="map-dot map-dot-3"></div>
                <div className="map-dot map-dot-4"></div>
                <div className="map-dot map-dot-5"></div>
                <div className="map-dot map-dot-6"></div>
                <div className="map-dot map-dot-7 active"></div>
                <div className="map-dot map-dot-8"></div>

                <div className="map-stand map-stand-1"></div>
                <div className="map-stand map-stand-2"></div>
                <div className="map-stand map-stand-3"></div>
                <div className="map-stand map-stand-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`room-description-panel ${
          isRoomDescriptionOpen ? "open" : ""
        }`}
      >
        <button
          className="room-description-close"
          onClick={toggleRoomDescription}
        >
          &times;
        </button>

        <div className="room-description-content">
          <h2 className="room-description-title">{roomDescription.title}</h2>

          <div className="room-description-text">
            <p>{roomDescription.description}</p>
          </div>

          <div className="room-description-gallery">
            {roomDescription.images.map((image, index) => (
              <div className="room-description-image-container" key={index}>
                <img
                  src={image}
                  alt={`Изображение ${index + 1}`}
                  className="room-description-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tour-halls-trigger"></div>

      <div className="tour-halls-bar-container">
        <div className="tour-halls-bar">
          {[
            {
              id: "room1",
              name: "ЗАЛ 1",
              description: "Посвящен периоду с 1712 по 1918г.",
              image: "/images/1.png",
            },
            {
              id: "room2",
              name: "ЗАЛ 2",
              description: "Посвящён периоду с 1918 по 1941г.",
              image: "/images/2.png",
            },
            {
              id: "room3",
              name: "ЗАЛ 3",
              description: "Посвящен периоду с 1941 по 1957г.",
              image: "/images/3.png",
            },
            {
              id: "room4",
              name: "ЗАЛ 4",
              description: "Космический зал",
              image: "/images/4.png",
            },
            {
              id: "room5",
              name: "ЗАЛ 5",
              description: "Зал славы",
              image: "/images/5.png",
            },
            {
              id: "room6",
              name: "ЗАЛ 6",
              description: "Лекционный зал",
              image: "/images/6.png",
            },
          ].map((hall) => (
            <div
              key={hall.id}
              className={`tour-hall-card ${hall.id === hallId ? "active" : ""}`}
              onClick={() => navigate(`/tour/${hall.id}`)}
            >
              <div className="tour-hall-image-container">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="tour-hall-image"
                />
              </div>
              <div className="tour-hall-info">
                <p className="tour-hall-name">{hall.name}</p>
                <p className="tour-hall-description">{hall.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTooltip && (
        <div
          className={`halls-tooltip ${tooltipFading ? "fadeout" : "active"}`}
        >
          <span className="halls-tooltip-text">
            Наведите курсор сюда для выбора зала
          </span>
          <span className="halls-tooltip-icon">↓</span>
        </div>
      )}
    </div>
  );
};

export default VirtualTour;
