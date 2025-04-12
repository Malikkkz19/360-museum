import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Marzipano from 'marzipano';
import './VirtualTour.css';

const VirtualTour = () => {
  const panoRef = useRef(null);
  const { hallId } = useParams();
  
  useEffect(() => {
    console.log("Загрузка тура для зала:", hallId);
    // Здесь логика загрузки и инициализации 360-тура
    // на основе hallId
    // Например, выбор нужной панорамы из списка или конфигурации
    // pannellum.viewer('panorama', { /* ...config based on hallId */ });

    // Данные о сценах (панорамах)
    const scenes = [
      {
        id: 'room1',
        name: 'Позиция 1',
        imageUrl: '/images/Image1.jpg',
        linkHotspots: [
          {
            yaw: 1.9,
            pitch: 0.1,
            target: 'room2',
            description: 'Перейти в Позиция 2'
          }
        ],
        infoHotspots: [
          {
            yaw: 2.5,
            pitch: 0,
            info: 'Низамидинов Малик Фазильевич Шаповалов Данил Георгиевич'
          }
        ],
        imageHotspots: [
          {
            yaw: 0.5,
            pitch: -0.1,
            imageUrl: '/images/canada.jpg'
          }
        ],
        // Новая точка с видео
        videoHotspots: [
          {
            yaw: 1.2,
            pitch: 0.3,
            videoUrl: '/videos/lion.mp4'
          }
        ]
      },
      {
        id: 'room2',
        name: 'Позиция 2',
        imageUrl: '/images/Image2.jpg',
        linkHotspots: [
          {
            yaw: -1.5,
            pitch: 0,
            target: 'room1',
            description: 'Вернуться в Позицию 1'
          },
          {
            yaw: 1.0,
            pitch: 0,
            target: 'room3',
            description: 'Перейти в Позицию 3'
          }
        ]
      },
      {
        id: 'room3',
        name: 'Позиция 3',
        imageUrl: '/images/room3.jpg',
        linkHotspots: [
          {
            yaw: -1.0,
            pitch: 0,
            target: 'room2',
            description: 'Вернуться в Позицию 2'
          },
          {
            yaw: 1.0,
            pitch: 0,
            target: 'room4',
            description: 'Перейти в Позицию 4'
          }
        ]
      },
      {
        id: 'room4',
        name: 'Позиция 4',
        imageUrl: '/images/room4.jpg',
        linkHotspots: [
          {
            yaw: -1.0,
            pitch: 0,
            target: 'room3',
            description: 'Вернуться в Позицию 3'
          }
        ]
      }
    ];

    const viewerOpts = {
      controls: {
        mouseViewMode: 'drag'
      }
    };

    // Инициализация Marzipano
    const viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);
    const sceneMap = {};
    
    scenes.forEach(sceneData => {
      const source = Marzipano.ImageUrlSource.fromString(sceneData.imageUrl);
      const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
      const limiter = Marzipano.RectilinearView.limit.traditional(2048, 120 * Math.PI / 180);
      const view = new Marzipano.RectilinearView({ yaw: 0, pitch: 0, fov: 1.5 }, limiter);
      
      const scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });
      
      sceneMap[sceneData.id] = { scene, view, data: sceneData };

      // Ссылочные точки (linkHotspots)
      sceneData.linkHotspots.forEach(hotspot => {
        const element = document.createElement('div');
        element.className = 'hotspot-link';
        const tooltip = document.createElement('div');
        tooltip.className = 'hotspot-tooltip';
        tooltip.textContent = hotspot.description;
        element.appendChild(tooltip);
        element.addEventListener('click', () => {
          switchScene(hotspot.target);
        });
        scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      // Информационные точки (infoHotspots)
      if (sceneData.infoHotspots) {
        sceneData.infoHotspots.forEach(hotspot => {
          const element = document.createElement('div');
          element.className = 'info-hotspot';
          const tooltip = document.createElement('div');
          tooltip.className = 'info-tooltip';
          tooltip.textContent = hotspot.info;
          element.appendChild(tooltip);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }
      
      // Точки с изображением (imageHotspots)
      if (sceneData.imageHotspots) {
        sceneData.imageHotspots.forEach(hotspot => {
          const element = document.createElement('div');
          element.className = 'image-hotspot';
          const tooltip = document.createElement('div');
          tooltip.className = 'image-tooltip';
          const img = document.createElement('img');
          img.src = hotspot.imageUrl;
          tooltip.appendChild(img);
          element.appendChild(tooltip);
          // Можно добавить обработчик клика для открытия модального окна, если нужно
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }
      
      // Точки с видео (videoHotspots)
      if (sceneData.videoHotspots) {
        sceneData.videoHotspots.forEach(hotspot => {
          const element = document.createElement('div');
          element.className = 'video-hotspot';
          
          const tooltip = document.createElement('div');
          tooltip.className = 'video-tooltip';
          // Создаём элемент видео с настройками автозапуска (видео должно быть muted для автоплей)
          const video = document.createElement('video');
          video.src = hotspot.videoUrl;
          video.setAttribute('muted', true);
          video.setAttribute('loop', true);
          video.setAttribute('playsinline', true);
          video.autoplay = true;
          // Отключаем звук (можно убрать, если хотите звук)
          video.muted = true;
          tooltip.appendChild(video);
          element.appendChild(tooltip);
          
          // Всплывающее окно с видео появляется при наведении на точку
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }
    });
    
    function switchScene(id) {
      if (sceneMap[id]) {
        sceneMap[id].scene.switchTo();
        const sceneTitle = document.getElementById('scene-title');
        if (sceneTitle) {
          sceneTitle.textContent = sceneMap[id].data.name;
        }
      }
    }
    
    if (scenes.length > 0) {
      switchScene(scenes[0].id);
    }
    
    const sceneList = document.createElement('div');
    sceneList.className = 'scene-list';
    scenes.forEach(scene => {
      const item = document.createElement('div');
      item.className = 'scene-item';
      item.textContent = scene.name;
      item.addEventListener('click', () => {
        switchScene(scene.id);
      });
      sceneList.appendChild(item);
    });
    panoRef.current.appendChild(sceneList);
    
    const sceneTitle = document.createElement('div');
    sceneTitle.id = 'scene-title';
    sceneTitle.className = 'scene-title';
    if (scenes.length > 0) {
      sceneTitle.textContent = scenes[0].name;
    }
    panoRef.current.appendChild(sceneTitle);
    
    return () => {
      viewer.destroy();
    };
  }, [hallId]);

  return <div ref={panoRef} className="pano-container"></div>;
};

export default VirtualTour;
