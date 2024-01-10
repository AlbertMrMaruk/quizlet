import { useState } from "react";
import { cards } from "./card";
import ReactHtmlParser from "react-html-parser";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [currentCard, setCurrentCard] = useState({ id: 0, expand: false });

  return (
    <div className="w-full bg-[#0a092d] h-[100vh]">
      <h4 className="font-bold text-2xl text-white m-auto text-center pt-8">
        {currentCard.id + 1} / 40
      </h4>

      {cards.map((el, index) => (
        <div
          className={`bg-[#2e3856]  rounded-lg md:w-[70%] m-auto my-8 md:my-5 p-0 md:h-[70vh] min-h-[42vh] w-[95%] ${
            currentCard.id === index ? "" : "hidden"
          }`}
          onClick={() =>
            setCurrentCard((prev) => ({ id: prev.id, expand: !prev.expand }))
          }
        >
          <div
            className={`w-[100%] md:h-[100%] h-[42vh] p-2 ${
              currentCard.id === index && !currentCard.expand
                ? "flex"
                : "hidden"
            }`}
          >
            <img src={el.img} alt={el.img} className=" m-0 w-[100%]" />
          </div>
          <div
            className={`w-[100%] p-5 m-auto text-white font-bold  text-sm  md:text-3xl md:py-[4rem] md:px-[2rem] md:text-center h-[42vh] md:h-[100%] ${
              currentCard.id === index && currentCard.expand
                ? "flex items-center"
                : "hidden"
            }`}
          >
            {ReactHtmlParser(el.text)}
          </div>
        </div>
      ))}

      <div className="flex gap-6 m-auto w-[100%] justify-center">
        <div
          className="rounded-full p-4 bg-[#2e3856] cursor-pointer"
          onClick={() => {
            if (currentCard.id === 0) {
              setCurrentCard({ id: 39, expand: false });
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
            if (currentCard.id === 39) {
              setCurrentCard({ id: 0, expand: false });
            } else {
              setCurrentCard((prev) => ({ id: prev.id + 1, expand: false }));
            }
          }}
        >
          <FaArrowRight className="text-white font-bold text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default App;
