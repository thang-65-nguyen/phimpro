import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomPrevArrow, CustomNextArrow } from "./PrevNext";
const DescribeMovie = () => {
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug, typeList } = useParams();
  const navigate = useNavigate();
  const [recommendedMovies, setRecommendedMovies] = useState({ items: [] });
  useEffect(() => {
    const fetchApiData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://phimapi.com/phim/${slug}`);
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API thể loại");
        }
        const data = await response.json();
        const episodes = data.episodes.flatMap((chapter) =>
          chapter.server_data.map((data) => ({
            name: data.name,
            link_embed: data.link_embed,
          }))
        );
        setEpisodes(episodes);
        setMovie(data.movie);
      } catch (error) {
        console.log("Không thể kết nối đến API thể loại");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `https://phimapi.com/v1/api/danh-sach/${typeList}`
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API phim đề xuất");
        }
        const data = await response.json();
        const { items } = data.data;
        setRecommendedMovies({ items });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim đề xuất:", error.message);
      }
    };
    fetchRecommendedMovies();
    fetchApiData();
  }, [slug, typeList]);

  const handleWatchEpisode = (episode) => {
    navigate(`/WatchMovie/${slug}`, { state: { episode } });
  };

  useEffect(() => {
    if (movie) {
      document.title = movie.name;
    } else {
      document.title = "Phim Mới";
    }
  }, [movie]);
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
    <div className="max-w-[1600px] bg-[#0f0f0f] w-full mx-auto overflow-hidden relative">
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
      {!isLoading && (
        <div>
          {movie ? (
            <div>
              <div
                className="h-[440px] bg-right-top bg-cover"
                style={{
                  backgroundImage: movie
                    ? `radial-gradient(circle, rgba(15, 15, 15, 0.2) 0%, rgb(15, 15, 15) 96%), url(${movie.thumb_url})`
                    : "none",
                }}
              />
              <div className="md:px-8 px-4">
                <div className="flex flex-col md:flex-row gap-x-10">
                  <div className="relative md:top-[-9rem] top-0 left-0 w-[360px]">
                    <img
                      src={movie.poster_url}
                      className="md:w-full w-[343px] md:object-cover md:h-[540px] h-[420px] rounded-md"
                      alt={movie.name}
                    />
                  </div>
                  <div className="text-2xl *:py-4 text-[#9594ae] mt-4 w-[806px]">
                    <div className="text-5xl text-white font-bold flex-wrap md:w-full w-[300px]">
                      {movie.name}
                    </div>
                    <div className="mb-3">{movie.origin_name}</div>
                    <div
                      className="flex gap-6 flex-wrap md:w-full w-[343px] py-4"
                      style={{
                        borderTop: "2px solid #242424",
                        borderBottom: "2px solid #242424",
                      }}
                    >
                      <div>Sản xuất: {movie.year}</div>
                      <span className="w-[1px] hidden h-[32px] bg-[#7e7c92] sm:block"></span>
                      <div>Chất lượng: {movie.quality}</div>
                      <span className="w-[1px] hidden h-[32px] bg-[#7e7c92] sm:block"></span>
                      <div>Ngôn ngữ: {movie.lang}</div>
                    </div>
                    <div>
                      <h2 className="text-3xl text-white mb-2">Nội dung</h2>
                      <p className="w-[343px] flex-wrap md:w-full">
                        {movie.content}
                      </p>
                    </div>
                    <div
                      className="flex gap-6 flex-wrap md:w-full w-[343px] py-4"
                      style={{
                        borderTop: "2px solid #242424",
                        borderBottom: "2px solid #242424",
                      }}
                    >
                      <div>Số tập: {movie.episode_total}</div>
                      <span className="w-[1px] hidden h-[32px] bg-[#7e7c92] sm:block"></span>
                      <div>Thời lượng: {movie.time}</div>
                      <span className="w-[1px] hidden h-[32px] bg-[#7e7c92] sm:block"></span>
                      <div>Tình trạng: {movie.episode_current}</div>
                    </div>
                    <div className="mb-3 flex-wrap md:w-full w-[343px]">
                      <span className="me-1">Thể loại:</span>
                      {movie.category.map((category, index) => (
                        <span key={index} className="">
                          {category.name}
                          {index < movie.category.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div
                      className="flex gap-6 flex-wrap py-4"
                      style={{
                        borderTop: "2px solid #242424",
                      }}
                    >
                      <div className="mb-3">
                        <span className="me-1">Quốc gia:</span>
                        {movie.country.map((country, index) => (
                          <Link to="" key={index}>
                            {country.name}
                            {index < movie.country.length - 1 && " / "}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="py-4"
                  style={{ borderTop: "2px solid #242424" }}
                >
                  <h3 className="text-white text-3xl my-6">Danh Sách Tập</h3>
                  <div className="grid lg:grid-cols-10 md:grid-cols-5 grid-cols-2 gap-4 flex-wrap px-12">
                    {episodes.map((episode, index) => (
                      <div
                        className="grid w-full cursor-pointer duration-200 hover:text-[#d3b235] font-medium h-12 text-xl place-content-center bg-[#272727] text-[#a2a0bd] rounded-md"
                        key={index}
                        onClick={() => handleWatchEpisode(episode)}
                      >
                        {episode.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="py-4"
                  style={{ borderTop: "2px solid #242424" }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-white text-3xl my-6">Phim đề xuất</h3>
                    <Link
                      to={`/${typeList}`}
                      className="hover:bg-[#272727] text-white py-2 rounded-[9999px] px-5"
                    >
                      Xem thêm
                    </Link>
                  </div>
                  <Slider {...sliderSettings} className="px-12">
                    {recommendedMovies.items &&
                    recommendedMovies.items.length > 0 ? (
                      recommendedMovies.items.map((recommendedMovie, index) => (
                        <div
                          key={index}
                          className="bg-[#0f0f0f] md:w-[286px] w-full md:h-[360px] lg:h-full h-[315px] rounded-sm hover:bg-[#272727] px-4 pt-4 pb-6"
                        >
                          <Link
                            to={`/${typeList}/${recommendedMovie.slug}`}
                            className="relative"
                          >
                            <img
                              src={`https://img.phimapi.com/${recommendedMovie.poster_url}`}
                              className="w-full h-[full] md:h-[300px] rounded-md md:w-[286px]"
                              alt={recommendedMovie.name}
                            />
                            <p
                              className="text-lg md:text-base absolute top-0 bg-[#fdd958] text-black font-bold px-2 py-1 left-0"
                              style={{ borderTopLeftRadius: "6px" }}
                            >
                              {recommendedMovie.episode_current}
                            </p>
                          </Link>
                          <h2 className="text-[#9f9dba] text-xl text-ellipsis whitespace-nowrap overflow-hidden px-2 flex-wrap mt-2">
                            {recommendedMovie.name}
                          </h2>
                        </div>
                      ))
                    ) : (
                      <p className="text-white w-full">
                        Không có phim đề xuất.
                      </p>
                    )}
                  </Slider>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
              <div>
                <div className="flex justify-center">
                  <img
                    src="https://media1.tenor.com/m/DRBDDTbuNmMAAAAC/facepalm-face-palm.gif"
                    className="w-[100px] h-[100px]"
                    alt=""
                  />
                </div>
                <p className="text-2xl text-white mt-4 text-center">
                  Không có thông tin phim...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DescribeMovie;
