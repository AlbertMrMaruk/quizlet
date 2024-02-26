import { useEffect, useState } from "react";
import { cards } from "./card_text";
import ReactHtmlParser from "react-html-parser";
import { FaArrowLeft, FaArrowRight, FaCheck, FaHome } from "react-icons/fa";
import { IoMdShuffle } from "react-icons/io";
import video from "./assets/video.MOV";

function App() {
  const [currentCard, setCurrentCard] = useState({ id: 0, expand: false });
  const [text, setText] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("filtedCards") &&
      localStorage.getItem("successCards")
    ) {
      console.log(JSON.parse(localStorage.getItem("successCards")));
      setFiltedCards(JSON.parse(localStorage.getItem("filtedCards")));
      setMainCards(JSON.parse(localStorage.getItem("filtedCards")));
      setSuccessCards(JSON.parse(localStorage.getItem("successCards")));
    }
  }, []);

  const clearHistory = () => {
    setMainCards(cards);
    setFiltedCards(cards);
    setCurrentCard({ id: 0, expand: false });
    setSuccessCards([]);
    localStorage.removeItem("filtedCards");
    localStorage.removeItem("successCards");
  };
  const updateLocalStorage = (successCards, filtedCards) => {
    localStorage.setItem("successCards", JSON.stringify(successCards));
    localStorage.setItem("filtedCards", JSON.stringify(filtedCards));
  };
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
    <div className="w-full bg-[#0a092d] min-h-[100vh]">
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
            <p
              className={`text-2xl font-bold pb-5 ${
                text === "сирумем кез" && "hidden"
              }`}
            >
              Все карточки изучены! Вы готовы к экзамену в РНИМУ 🤮
            </p>

            <input
              type="text"
              className="w-[250px] py-2 px-3 text-black bg-white rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text === "сирумем кез" && (
              <>
                <video
                  controls
                  autoPlay={true}
                  className="m-auto my-5 md:w-[20%] w-[80%]"
                >
                  <source src={video} />
                </video>
                <p className="md:text-2xl text-md font-bold p-3">
                  И я тебя очень сильно люблю любимая ❤️ <br></br>Очень сильно
                  горжусь тобой и надеюсь ты также легко сдашь экзамен как
                  закончила эти вопросы. <br /> Я в тебя верю и всегда буду
                  поддерживать 😘❤️ <br />
                  P.S. Это мы радуемся что ты изучила все карточки 😍❤️
                </p>
              </>
            )}
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
            className={`w-[100%] md:h-[100%] h-[44vh] p-3  justify-center  items-center ${
              currentCard.id === index && !currentCard.expand
                ? "flex"
                : "hidden"
            }`}
          >
            <h1 className=" text-2xl text-white text-center font-bold">
              {/* <img src={el.img} alt={el.img} className=" m-0 w-[100%]" /> */}
              {el.header}
            </h1>
          </div>
          <div
            className={`w-[100%] p-5 m-auto text-white font-bold  text-xl  md:text-3xl md:py-[4rem] md:px-[2rem] md:text-center h-[44vh] md:h-[100%] ${
              currentCard.id === index && currentCard.expand
                ? "flex items-center"
                : "hidden"
            }`}
          >
            <ol>
              {el.text.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ol>
            {/* {ReactHtmlParser(el.text)} */}
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
            const newSuccess = [...successCards, filtedCards[currentCard.id]];
            const newFilted = filtedCards.slice();
            newFilted.splice(currentCard.id, 1);

            setSuccessCards(newSuccess);
            setFiltedCards(newFilted);
            updateLocalStorage(newSuccess, newFilted);
          }}
        >
          <FaCheck className="text-white font-bold text-2xl" />
        </div>
      </div>
      <div
        className="text-[#c3c3c3] font-bold mt-3 pb-4 cursor-pointer text-md text-center"
        onClick={clearHistory}
      >
        {" "}
        Очистить историю
      </div>
    </div>
  );
}

export default App;
