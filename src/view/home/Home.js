import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomNextArrow, CustomPrevArrow } from "../Describe/PrevNext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = ({ apiEndpoint, title, link }) => {
  const [movie, setMovie] = useState({ items: [] });
  const [currentMovieName, setCurrentMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typeList, setTypeList] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchApiData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API thể loại");
        }
        const data = await response.json();
        const { items, type_list } = data.data;
        setMovie({ items });
        setTypeList(type_list);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiData();
  }, [apiEndpoint]);
  useEffect(() => {
    if (currentMovieName) {
      document.title = currentMovieName;
    } else {
      document.title = "Phim hay";
    }
  }, [currentMovieName]);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div>
        {isLoading && (
          <div className="w-full h-full bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
            <div>
              <img
                src="https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/loadlurk-loading-D9YCxDIJ.gif"
                className="w-[100px] h-[100px]"
                alt=""
              />
              <p className="text-2xl text-white mt-4">Loading...</p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center md:mb-5 mb-2">
          <h1 className="text-left text-white inline-block md:text-3xl text-xl pb-1">
            {title}
          </h1>
          <Link
            to={link}
            className="hover:bg-[#272727] py-2 rounded-[9999px] px-5"
          >
            Xem thêm
          </Link>
        </div>
        {!isLoading && (
          <Slider {...sliderSettings} className="lg:px-12 md:h-full h-[315px]">
            {movie.items.length > 0 &&
              movie.items.map((movie, index) => (
                <div
                  key={index}
                  className="bg-[#0f0f0f] md:w-[286px] w-[340px] md:h-[360px] lg:h-full h-[315px] rounded-sm hover:bg-[#272727] px-4 pt-4 pb-6"
                >
                  <Link
                    to={`/${typeList}/${movie.slug}`}
                    className="relative"
                    onClick={() => {
                      setCurrentMovieName(movie.name);
                    }}
                  >
                    <img
                      src={`https://img.phimapi.com/${movie.poster_url}`}
                      className="w-[350px] h-[250px] object-cover md:h-[300px] rounded-md md:w-[286px]"
                      alt={movie.name}
                    />
                    <p
                      className="text-sm md:text-lg absolute top-0 bg-[#fdd958] text-black font-bold px-2 py-1 left-0"
                      style={{ borderTopLeftRadius: "6px" }}
                    >
                      {movie.episode_current}
                    </p>
                    <div className="flex gap-x-1 md:text-lg absolute bottom-12 left-2 text-black font-bold">
                      <div className="bg-white/60 px-2 py-[2px] text-[10px]">{movie.year}</div>
                      <div className="bg-white/60 px-2 py-[2px] text-[10px]">{movie.lang}</div>
                      <div className="bg-white/60 px-2 py-[2px] text-[10px]">{movie.quality}</div>
                    </div>
                    <h2 className="text-[#9f9dba] text-xl text-ellipsis whitespace-nowrap overflow-hidden px-2 flex-wrap mt-2">
                      {movie.name}
                    </h2>
                  </Link>
                </div>
              ))}
          </Slider>
        )}
      </div>
    </>
  );
};
export default Home;
