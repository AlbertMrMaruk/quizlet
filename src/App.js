import { useState } from "react";
import { cards } from "./card";
import ReactHtmlParser from "react-html-parser";
import { FaArrowLeft, FaArrowRight, FaCheck, FaHome } from "react-icons/fa";
import { IoMdShuffle } from "react-icons/io";
import video from "./assets/video.MP4";

function App() {
  const [currentCard, setCurrentCard] = useState({ id: 0, expand: false });

  const [filtedCards, setFiltedCards] = useState(cards);
  const [mainCards, setMainCards] = useState(cards);
  const [showReturnBtn, setShowReturnBtn] = useState(false);
  const [successCards, setSuccessCards] = useState([]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className="w-full bg-[#0a092d] h-[100vh]">
      <h4 className="font-bold text-2xl text-white m-auto text-center pt-8">
        {currentCard.id + 1} / {filtedCards.length}
      </h4>
      <h4
        className="font-bold text-2xl text-white m-auto text-center pt-3"
        onClick={() => {
          setMainCards(filtedCards);
          setFiltedCards(successCards);
          setShowReturnBtn(true);
          setCurrentCard({ id: 0, expand: false });
        }}
      >
        Выучено: {successCards.length} / {cards.length}
      </h4>

      {successCards.length === cards.length && !showReturnBtn && (
        <>
          <div className=" text-white m-auto text-center p-5">
            <video className="m-auto my-5" src={video} />
            <p className="text-2xl font-bold">
              Ты все сделааала!!! Ты моя умничка, очень сильно тебя люблю и
              горжусь тобой 😘❤️❤️
            </p>
          </div>
        </>
      )}
      {filtedCards.map((el, index) => (
        <div
          className={`bg-[#2e3856]  rounded-lg md:w-[70%] m-auto my-8 md:my-5 p-0 md:h-[70vh] min-h-[44vh] w-[95%] ${
            currentCard.id === index ? "" : "hidden"
          }`}
          key={index}
          onClick={() =>
            setCurrentCard((prev) => ({ id: prev.id, expand: !prev.expand }))
          }
        >
          <div
            className={`w-[100%] md:h-[100%] h-[44vh] p-2 ${
              currentCard.id === index && !currentCard.expand
                ? "flex"
                : "hidden"
            }`}
          >
            <img src={el.img} alt={el.img} className=" m-0 w-[100%]" />
          </div>
          <div
            className={`w-[100%] p-5 m-auto text-white font-bold  text-sm  md:text-3xl md:py-[4rem] md:px-[2rem] md:text-center h-[44vh] md:h-[100%] ${
              currentCard.id === index && currentCard.expand
                ? "flex items-center"
                : "hidden"
            }`}
          >
            {ReactHtmlParser(el.text)}
          </div>
        </div>
      ))}

      <div className={`flex gap-6 m-auto w-[100%] justify-center`}>
        <div
          className={`rounded-full p-4 bg-[#2e3856] cursor-pointer ${
            showReturnBtn ? "" : "hidden"
          }`}
          onClick={() => {
            setFiltedCards(mainCards);
            if (mainCards.length === 0) {
              setCurrentCard({ id: -1, expand: false });
            } else {
              setCurrentCard({ id: 0, expand: false });
            }
            setShowReturnBtn(false);
          }}
        >
          <FaHome className="text-white font-bold text-2xl" />
        </div>
        <div
          className="rounded-full p-4 bg-[#2e3856] cursor-pointer"
          onClick={() => {
            if (currentCard.id === 0) {
              setCurrentCard({ id: filtedCards.length - 1, expand: false });
            } else {
              setCurrentCard((prev) => ({ id: prev.id - 1, expand: false }));
            }
          }}
        >
          <FaArrowLeft className="text-white font-bold text-2xl" />
        </div>
        <div
          className="rounded-full p-4 bg-[#2e3856] cursor-pointer"
          onClick={() => {
            if (currentCard.id === filtedCards.length - 1) {
              setCurrentCard({ id: 0, expand: false });
            } else {
              setCurrentCard((prev) => ({ id: prev.id + 1, expand: false }));
            }
          }}
        >
          <FaArrowRight className="text-white font-bold text-2xl" />
        </div>
        <div
          className="rounded-full p-4 bg-[#3e59ab] cursor-pointer"
          onClick={() => {
            setFiltedCards(shuffle(filtedCards));
            setCurrentCard({ id: 0, expand: false });
          }}
        >
          <IoMdShuffle className="text-white font-bold text-2xl" />
        </div>
        <div
          className={`rounded-full p-4 bg-[#469046] cursor-pointer ${
            showReturnBtn && "hidden"
          }`}
          onClick={() => {
            if (currentCard.id > filtedCards.length - 2) {
              setCurrentCard({ id: currentCard.id - 1, expand: false });
            }
            setSuccessCards((prev) => [...prev, filtedCards[currentCard.id]]);
            setFiltedCards((prev) => {
              const newArr = prev.slice();
              newArr.splice(currentCard.id, 1);
              return newArr;
            });
          }}
        >
          <FaCheck className="text-white font-bold text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default App;
