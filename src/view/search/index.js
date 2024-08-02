import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const keywordParam = query.get("keyword");
    setLoading(true);
    if (keywordParam) {
      setKeyword(keywordParam);

      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://phimapi.com/v1/api/tim-kiem?keyword=${keywordParam}`
          );
          if (!response.ok) {
            console.log("Không thể kết nối đến API");
            return;
          }
          const data = await response.json();
          if (!data.data || !data.data.items) {
            console.log("Dữ liệu không hợp lệ từ API");
            return;
          }
          setSearchResults(data.data.items);
        } catch (error) {
          toast.error("Lỗi");
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [location.search]);
  const formatType = (type) => {
    if (type === "hoathinh") {
      return "hoat-hinh";
    } else if (type === "single") {
      return "phim-le";
    } else if (type === "series") {
      return "phim-bo";
    } else if (type === "tvshows") {
      return "tv-shows";
    }
    return type;
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto overflow-x-visible">
      {loading && (
        <div className="w-full h-full bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
          <img
            src="https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/loadlurk-loading-D9YCxDIJ.gif"
            className="w-[100px] h-[100px]"
            alt=""
          />
          <p className="text-2xl text-white mt-4">Loading...</p>
        </div>
      )}
      <div
        className="mt-[90px] inline-block max-w-max md:w-full w-[320px] mb-10 mx-6 pb-3 text-3xl flex-wrap font-semibold text-white"
        style={{ borderBottom: "2px solid white" }}
      >
        Kết quả tìm kiếm cho từ khóa: {keyword}
      </div>
      {!loading && (
        <div className="grid gap-4 text-white xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:px-8 px-6 mb-10">
          {searchResults.map((movie, index) => (
            <Link
              to={`/${formatType(movie.type)}/${movie.slug}`}
              key={index}
              className="w-full max-w-[360px] h-[450px] flex flex-col rounded hover:bg-[#272727] hover:scale-110 duration-200 shadow-xl shadow-transparent hover:shadow-black/40 group"
            >
              <img
                src={`https://img.phimapi.com/${movie.poster_url}`}
                className="h-[300px] group-hover:h-[200px] object-top object-cover duration-300 m-3 rounded-t overflow-hidden"
                alt={movie.name}
              />
              <div className="px-6 overflow-hidden">
                <p className="text-xl mt-1 group-hover:text-white text-[#9e9dba] font-bold whitespace-nowrap text-ellipsis overflow-hidden">
                  {movie.name}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#595866] group-hover:bg-[#fdd958] px-2 py-1 font-bold text-black">
                    {movie.year}
                  </span>
                  <span className="bg-[#595866] group-hover:bg-[#fdd958] px-2 py-1 font-bold text-black">
                    {movie.lang}
                  </span>
                  <span className="bg-[#595866] group-hover:bg-[#fdd958] px-2 py-1 font-bold text-black">
                    {movie.quality}
                  </span>
                </div>
                <div className="hidden flex-wrap group-hover:block mt-2 gap-y-1.5 justify-between">
                  <div className="text-[#9e9dba] font-bold flex gap-x-1 w-full">
                    Quốc gia:
                    {movie.country.map((country, index) => (
                      <div key={index}>
                        {country.name}
                        {index < movie.country.length - 1 && " / "}
                      </div>
                    ))}
                  </div>
                  <div className="text-[#9e9dba] font-bold">
                    Trìng trạng: {movie.episode_current}
                  </div>
                  <div className="text-[#9e9dba] font-bold">
                    Thời lượng: {movie.time}
                  </div>
                  <div className="text-[#9e9dba] font-bold line-clamp-1 w-full">
                    Thể loại:
                    {movie.category.map((category, index) => (
                      <div key={index}>
                        {category.name}
                        {index < movie.category.length - 1 && ", "}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
