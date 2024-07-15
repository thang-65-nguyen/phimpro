import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./router";
import { useEffect, useState } from "react";

function App() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="">
      <AppRouter></AppRouter>
      {showScrollToTop && (
        <div
          className="fixed bottom-5 px-3 py-[6px] right-5 border border-[#bfbfbf] rounded-md cursor-pointer"
          onClick={top}
        >
          <button>
            <i className="fa-solid fa-angle-up text-[#ffd233]"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
