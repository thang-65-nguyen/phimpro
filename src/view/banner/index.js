import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";

const AppBanner = () => {
  const [banner, setBanner] = useState([]);
  const [visibleBannerIndex, setVisibleBannerIndex] = useState(0);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
        );
        if (!response.ok) {
          toast.error("Không thể kết nối đến API thể loại");
        }
        const data = await response.json();
        setBanner(data.items);
      } catch (error) {
        toast.error("Không thể kết nối đến API thể loại");
      }
    };

    fetchApiData();
  }, []);

  const showNextBanner = () => {
    setVisibleBannerIndex((prevIndex) => (prevIndex + 1) % banner.length);
  };

  const showPrevBanner = () => {
    setVisibleBannerIndex((prevIndex) =>
      prevIndex === 0 ? banner.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(showNextBanner, 5000);
    return () => clearInterval(intervalId);
  }, [banner]);

  return (
    <div className="max-w-[1600px] bg-black w-full mx-auto overflow-hidden relative">
      {banner.length > 0 &&
        banner.map((banner, index) => (
          <div
            key={index}
            className={`w-full relative h-full ${
              index === visibleBannerIndex ? "block" : "hidden"
            }`}
          >
            <Link to={`/DescribeFilm/${banner.slug}`}>
              <div
                className="md:h-[700px] h-[500px] md:bg-right-top bg-center bg-cover"
                style={{
                  backgroundImage: banner
                    ? `radial-gradient(circle, rgba(15, 15, 15, 0.2) 0%, rgb(15, 15, 15) 96%), url(${banner.thumb_url})`
                    : "none",
                }}
              />
              <div className="absolute justify-between text-white top-[90px] left-0 h-[90%] w-full flex px-10">
                <div className="md:basis-3/5 basis-full text-white mt-[90px] xl:pl-10 xs:pl-4 pl-0">
                  <h2 className="md:text-ellipsis flex-wrap w-full lg:w-[594px] lg:text-6xl text-2xl font-bold lg:line-clamp-3 lg:mb-6 lg:overflow-hidden">
                    {banner.name}
                  </h2>
                  <div className="mt-1 max-w-[275px] whitespace-nowrap text-ellipsis overflow-hidden py-1">
                    <span className="bg-[#ffd233] lg:text-xl text-base px-3 py-1">
                      {banner.origin_name}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-[#3b82f6] px-3 py-1">
                      {banner.year}
                    </span>
                  </div>
                </div>
                <div className="md:flex hidden items-end basis-2/5">
                  <div
                    className="w-[90%] max-w-[480px] h-[90%] bg-top bg-cover rounded-t-2xl relative"
                    style={{
                      backgroundImage: banner
                        ? `radial-gradient(circle, rgba(15, 15, 15, 0.2) 0%, rgb(15, 15, 15) 96%), url(${banner.poster_url})`
                        : "none",
                    }}
                  >
                    <Link to={`/DescribeFilm/${banner.slug}`}>
                      <div className="absolute cursor-pointer pulse lg:-right-9 -right-8 top-16 lg:size-[80px] size-[62px] rounded-full bg-red-600 grid place-content-center scale-100 hover:scale-110 duration-300">
                        <div className="text-white text-3xl ml-1">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

      {/* Nút Prev */}
      <button
        onClick={showPrevBanner}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:bg-[#272727] hover:bg-opacity-75 rounded-full w-14 h-14 flex items-center justify-center"
      >
        <i className="fa-solid fa-angle-left text-2xl"></i>
      </button>
      {/* Nút Next */}
      <button
        onClick={showNextBanner}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:bg-[#272727] hover:bg-opacity-75 rounded-full w-14 h-14 flex items-center justify-center"
      >
        <i className="fa-solid fa-angle-right text-2xl"></i>
      </button>
    </div>
  );
};

export default AppBanner;
