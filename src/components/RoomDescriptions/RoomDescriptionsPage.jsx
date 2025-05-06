import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./RoomDescriptionsPage.css";

const roomsData = [
  {
    id: "room1",
    name: "ЗАЛ 1",
    description:
      "Посвящен периоду с 1712 по 1918г. Здесь показана история Академии, начиная с создания ещё при Петре I Инженерной школы, ставшей затем артиллерийской и инженерной школой, затем шляхетским корпусом и, наконец, 2-м кадетским корпусом. Несколько стендов посвящены истории военных учебных заведений, ныне вошедших в Академию: Топографического училища, Владимирского и Павловского Военных училищ. Один из стендов посвящён генералу Засядко, создателю первых боевых ракет в России.",
    images: ["/images/1.png", "/images/hall1.jpg", "/images/vka.jpg"],
  },
  {
    id: "room2",
    name: "ЗАЛ 2",
    description:
      "Посвящён периоду с 1918 по 1941г. Показана история Петроградской школы техников-механиков Красного воздушного флота, открытой в зданиях 2-го Кадетского корпуса в 1922г., а также Военно-Теоретической школы Воздушных сил РККА, располагавшейся в здании бывшего Павловского училища начиная с 1924 года. Рассказывается история Ленинградского институт инженеров гражданского воздушного флота (ЛИИ ГВФ), на базе которого в условиях угрозы войны 27 марта 1941 года Приказом народного комиссара обороны Союза ССР в Пулково была создана Ленинградская военно-воздушная академия Красной Армии.",
    images: ["/images/2.png", "/images/hall2.jpg", "/images/vka.jpg"],
  },
  {
    id: "room3",
    name: "ЗАЛ 3",
    description:
      "Посвящен периоду 1941-1957г. Здесь рассказывается от деятельности академии в эвакуации в Йошкар-Оле, возвращении её в Ленинград, награждении Орденом Красного Звания и получении имени А.Ф. Можайского. Отдельный стенд посвящен самому великому русскому изобретателю, чьё имя носит академия, контр-адмиралу А.Ф. Можайскому, и его знаменитому изобретению – летательному аппарату тяжелее воздуха, созданному за 20 лет до братьев Райт. В зале также имеется экспозиция, посвящённая истории появления и развития ракетной техники в России и затем в СССР от пороховых боевых ракет 19-го века до запуска первого ИСЗ и о переходе академии с подготовки кадров для ВВС на подготовку офицерских кадров для РВСН. В зале расположены находки поискового отряда «Космос», существовавшего в академии в 90-е годы, а также макеты ракет ГИРД и и макет первого космического аппарата ИС-1, подаренного академии СП.Королёвым в 1961 году.",
    images: ["/images/3.png", "/images/room3.jpg", "/images/vka.jpg"],
  },
  {
    id: "room4",
    name: "ЗАЛ 4",
    description:
      "Космический зал музея посвящен истории Академии и её достижениям с начала 1960-х годов по настоящее время. В зале представлены макеты космических аппаратов, ракетные двигатели, скафандр и кресло космонавта, а также образцы космической техники, в том числе созданные в стенах Академии: макет ядерной энергоустановки «Топаз-2» и КА «Можаец».",
    images: ["/images/4.png", "/images/room4.jpg", "/images/vka.jpg"],
  },
  {
    id: "room5",
    name: "ЗАЛ 5",
    description:
      "Зал славы посвящен выдающимся людям, в разное время имевшим прямое отношение к Академии. Генерал-полковник Кизим Л.Д., генерал-лейтенант Шумилин А.А., генерал-лейтенант Медведев Д.А., генерал-майор Гудилин В.Е., полковник Петухов Г.Б., генерал армии Антонов А.И., космонавт Шаргин Ю.Г., генерал-полковник Поповкин В.А. нашли достойное отражение на стендах и витринах зала, где представлены различные материалы, рассказывающие об этих людях, личные вещи, документы, награды.",
    images: ["/images/5.png", "/images/canada.jpg", "/images/vka.jpg"],
  },
  {
    id: "room6",
    name: "ЗАЛ 6",
    description:
      "Лекционный, учебно-методический зал служит для проведения лекций, семинаров, концференций и других. мероприятий, связанных с историей Академии и развития космической техники, и имеет профориентационную направленность. В зале представлены материалы по структуре, составу Академии в настоящее время, назначению и задачам входящих в неё факультетов.",
    images: ["/images/6.png", "/images/Image1.jpg", "/images/vka.jpg"],
  },
];

function RoomDescriptionsPage() {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRoomClick = (roomId) => {
    setActiveRoom(roomId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTourClick = (roomId) => {
    navigate(`/tour/${roomId}`);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalVisible]);

  const activeRoomData = roomsData.find((room) => room.id === activeRoom);

  return (
    <div className="room-descriptions-page">
      <div className="twinkling-stars">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={`star-${i}`} className={`star-dot star-dot-${i + 1}`}></div>
        ))}
      </div>

      <div className="room-descriptions-content">
        {/* Заголовок */}
        <div className="room-descriptions-header">
          <div className="room-descriptions-title-container">
            <h1 className="room-descriptions-title">ОПИСАНИЯ ЗАЛОВ</h1>
            <h2 className="room-descriptions-subtitle">
              МУЗЕЯ ВОЕННО-КОСМИЧЕСКОЙ АКАДЕМИИ
            </h2>
          </div>
        </div>

        <div className="rooms-gallery">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="room-card"
              onClick={() => handleRoomClick(room.id)}
            >
              <div className="room-card-carousel">
                <Carousel
                  autoPlay
                  infiniteLoop
                  showStatus={false}
                  showThumbs={false}
                  showIndicators={false}
                  showArrows={false}
                  interval={5000}
                  transitionTime={1000}
                >
                  {room.images.map((image, index) => (
                    <div key={index} className="room-card-slide">
                      <img
                        src={image}
                        alt={`${room.name} - фото ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="room-card-overlay">
                <h3 className="room-card-title">{room.name}</h3>
                <div className="room-card-hover-info">
                  <span>Нажмите для просмотра информации</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalVisible && activeRoomData && (
          <div className="room-modal-overlay" onClick={handleCloseModal}>
            <div className="room-modal" onClick={(e) => e.stopPropagation()}>
              <button className="room-modal-close" onClick={handleCloseModal}>
                &times;
              </button>

              <div className="room-modal-header">
                <h2 className="room-modal-title">{activeRoomData.name}</h2>
              </div>

              <div className="room-modal-content">
                <div className="room-modal-carousel">
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={true}
                    interval={6000}
                    transitionTime={1000}
                  >
                    {activeRoomData.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`${activeRoomData.name} - фото ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="room-modal-description">
                  <p>{activeRoomData.description}</p>
                </div>

                <div className="room-modal-actions">
                  <button
                    className="tour-button"
                    onClick={() => handleTourClick(activeRoomData.id)}
                  >
                    Виртуальный тур
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="room-descriptions-footer">
          <button
            className="room-descriptions-back-button"
            onClick={handleBackClick}
          >
            <span className="back-arrow">←</span>
            <span className="back-text">назад</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDescriptionsPage;
