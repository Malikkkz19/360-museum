import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Marzipano from "marzipano";
import "./VirtualTour.css";
import "./VirtualTourResponsive.css";

const VirtualTour = () => {
  const panoRef = useRef(null);
  const { hallId } = useParams();
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState("");

  useEffect(() => {
    console.log("Загрузка тура для зала:", hallId);
    // Здесь логика загрузки и инициализации 360-тура
    // на основе hallId
    // Например, выбор нужной панорамы из списка или конфигурации
    // pannellum.viewer('panorama', { /* ...config based on hallId */ });

    // Данные о сценах (панорамах)
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
        // Новая точка с видео
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

    // Инициализация Marzipano
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

      // Ссылочные точки (linkHotspots)
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

      // Информационные точки (infoHotspots)
      if (sceneData.infoHotspots) {
        sceneData.infoHotspots.forEach((hotspot) => {
          const element = document.createElement("div");
          element.className = "info-hotspot";

          // Создаем затемненный фон для модального окна
          const backdrop = document.createElement("div");
          backdrop.className = "info-tooltip-backdrop";

          // Создаем модальное окно с информацией
          const tooltip = document.createElement("div");
          tooltip.className = "info-tooltip";

          // Заголовок модального окна
          const header = document.createElement("h3");
          header.className = "info-tooltip-header";
          header.textContent = hotspot.title || "Информация";
          tooltip.appendChild(header);

          // Кнопка закрытия
          const closeButton = document.createElement("button");
          closeButton.className = "info-tooltip-close";
          closeButton.innerHTML = "&times;";
          closeButton.addEventListener("click", () => {
            tooltip.classList.remove("active");
            backdrop.classList.remove("active");
          });
          tooltip.appendChild(closeButton);

          // Текстовое описание
          if (hotspot.info) {
            const content = document.createElement("div");
            content.className = "info-tooltip-content";
            content.innerHTML = hotspot.info;
            tooltip.appendChild(content);
          }

          // Мини-галерея (если есть)
          if (hotspot.gallery && hotspot.gallery.length > 0) {
            const gallery = document.createElement("div");
            gallery.className = "info-tooltip-gallery";

            hotspot.gallery.forEach((imgSrc) => {
              const img = document.createElement("img");
              img.className = "gallery-image";
              img.src = imgSrc;
              img.alt = "Галерея";

              // Открытие изображения в большем размере при клике
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

          // Видео (если есть)
          if (hotspot.video) {
            const videoContainer = document.createElement("div");
            videoContainer.className = "info-tooltip-video";

            // Поддержка YouTube, Vimeo или HTML5 видео
            if (
              hotspot.video.includes("youtube.com") ||
              hotspot.video.includes("youtu.be")
            ) {
              // YouTube iframe
              const iframe = document.createElement("iframe");
              iframe.src = hotspot.video.replace("watch?v=", "embed/");
              iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
              iframe.allowFullscreen = true;
              videoContainer.appendChild(iframe);
            } else if (hotspot.video.includes("vimeo.com")) {
              // Vimeo iframe
              const iframe = document.createElement("iframe");
              iframe.src = hotspot.video.replace(
                "vimeo.com",
                "player.vimeo.com/video"
              );
              iframe.allow = "autoplay; fullscreen; picture-in-picture";
              iframe.allowFullscreen = true;
              videoContainer.appendChild(iframe);
            } else {
              // HTML5 видео
              const video = document.createElement("video");
              video.src = hotspot.video;
              video.controls = true;
              video.style.width = "100%";
              video.style.borderRadius = "5px";
              videoContainer.appendChild(video);
            }

            tooltip.appendChild(videoContainer);
          }

          // Добавляем модальное окно и фон в DOM
          document.body.appendChild(backdrop);
          document.body.appendChild(tooltip);

          // Обработчик клика по хотспоту
          element.addEventListener("click", () => {
            tooltip.classList.add("active");
            backdrop.classList.add("active");
          });

          scene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }

      // Точки с изображением (imageHotspots)
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
          // Можно добавить обработчик клика для открытия модального окна, если нужно
          scene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }

      // Точки с видео (videoHotspots)
      if (sceneData.videoHotspots) {
        sceneData.videoHotspots.forEach((hotspot) => {
          const element = document.createElement("div");
          element.className = "video-hotspot";

          const tooltip = document.createElement("div");
          tooltip.className = "video-tooltip";
          // Создаём элемент видео с настройками автозапуска (видео должно быть muted для автоплей)
          const video = document.createElement("video");
          video.src = hotspot.videoUrl;
          video.setAttribute("muted", true);
          video.setAttribute("loop", true);
          video.setAttribute("playsinline", true);
          video.autoplay = true;
          // Отключаем звук (можно убрать, если хотите звук)
          video.muted = true;
          tooltip.appendChild(video);
          element.appendChild(tooltip);

          // Всплывающее окно с видео появляется при наведении на точку
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

  // Состояние для панели описания зала
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

  // Функция для открытия/закрытия панели описания зала
  const toggleRoomDescription = () => {
    setIsRoomDescriptionOpen(!isRoomDescriptionOpen);
  };

  // Функции для кнопок навигации
  const handleBackClick = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  return (
    <div className="virtual-tour-container">
      <div ref={panoRef} className="pano-container"></div>

      {/* Заголовок академии */}
      <div className="academy-title">
        Военно-космическая академия им. А.Ф. Можайского
      </div>

      {/* Кнопка назад */}
      <button className="nav-button tour-back-button" onClick={handleBackClick}>
        <span className="back-arrow">←</span>
        <span className="button-text">назад</span>
      </button>

      {/* Навигационная панель */}
      <div className="tour-navigation-panel">
        <button className="nav-button home-button" onClick={handleHomeClick}>
          <span className="button-text">главный экран</span>
        </button>

        <button className="nav-button map-button" onClick={handleMapClick}>
          <span className="button-text">карта музея</span>
        </button>

        <button
          className="nav-button room-description-button"
          onClick={toggleRoomDescription}
        >
          <span className="button-text">описание зала</span>
        </button>
      </div>

      {/* Схема помещения (вынесена из навигационной панели) */}
      <div className="room-map-container">
        <div className="room-map">
          {/* Схема помещения */}
          <div className="room-map-outline">
            {/* Точки на карте */}
            <div className="map-dot map-dot-1"></div>
            <div className="map-dot map-dot-2"></div>
            <div className="map-dot map-dot-3"></div>
            <div className="map-dot map-dot-4"></div>
            <div className="map-dot map-dot-5"></div>
            <div className="map-dot map-dot-6"></div>
            <div className="map-dot map-dot-7 active"></div>
            <div className="map-dot map-dot-8"></div>

            {/* Прямоугольники стендов */}
            <div className="map-stand map-stand-1"></div>
            <div className="map-stand map-stand-2"></div>
            <div className="map-stand map-stand-3"></div>
            <div className="map-stand map-stand-4"></div>
          </div>
        </div>
      </div>

      {/* Выезжающая панель с описанием зала */}
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
    </div>
  );
};

export default VirtualTour;
