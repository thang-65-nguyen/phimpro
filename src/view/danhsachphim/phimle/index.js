import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListFilm = () => {
  const [movie, setMovie] = useState({
    seoOnPage: {},
    items: [],
    titlePage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMovieName, setCurrentMovieName] = useState("");
  const [typeList, setTypeList] = useState(""); // State để lưu trữ type_list từ API

  const fetchApiData = async (page = 1) => {
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/danh-sach/phim-le?limit=32&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Không thể kết nối đến API thể loại");
      }
      const data = await response.json();
      const { seoOnPage, items, titlePage, params, type_list } = data.data;
      setMovie({ seoOnPage, items, titlePage });
      setTypeList(type_list); 
      if (params && params.pagination) {
        const { totalPages } = params.pagination;
        setTotalPages(totalPages);
      } else {
        console.warn("Pagination data not found in API response:", data);
      }
    } catch (error) {
      console.error("Không thể kết nối đến API thể loại", error);
    }
  };

  useEffect(() => {
    fetchApiData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentMovieName) {
      document.title = currentMovieName;
    } else {
      document.title = "Phim Lẻ";
    }
  }, [currentMovieName]);

  return (
    <>
      <div className="relative">
        <img
          src="https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/wallpaper-72tiVneq.png"
          alt=""
          className="w-full md:h-[440px] h-[300px] object-cover"
        />
        <div
          className="absolute w-full h-full bottom-0 right-0 flex items-end top-0 left-0"
          style={{
            backgroundImage:
              "radial-gradient(circle,#0f0f0f33 50%,#0f0f0f 90%)",
          }}
        >
          <div className="w-[90%] mx-auto mb-4 sm:mb-10 md:mb-20">
            {movie && (
              <h2 className="text-white md:text-6xl text-3xl mb-5">{movie.titlePage}</h2>
            )}
            {movie && movie.seoOnPage && (
              <div className="text-[#9e9dba] md:text-3xl text-lg flex-wrap md:leading-10 md:w-[980px]">
                {movie.seoOnPage.descriptionHead}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid pt-[20px] gap-4 text-white xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:px-8 px-6 pb-10">
        {movie.items.length > 0 ? (
          movie.items.map((movie, index) => (
            <Link
              to={{
                pathname: `/${typeList}/${movie.slug}`, 
              }}
              key={index}
              className="w-full h-[450px] flex flex-col rounded hover:bg-[#272727] hover:scale-110 duration-200 shadow-xl shadow-transparent hover:shadow-black/40 group"
              onClick={() => {
                setCurrentMovieName(movie.name);
              }}
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
                    Thể loại:{" "}
                    {movie.category.map((category, index) => (
                      <React.Fragment key={index}>
                        {category.name}
                        {index < movie.category.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full h-full bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
            <div>
              <img
                src="https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/loadlurk-loading-D9YCxDIJ.gif"
                className="w-[100px] h-[100px]"
                alt=""
              />
              <p className="text-2xl">Loading...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-[#9e9dba] bg-[#272727] rounded disabled:opacity-50"
        >
          <i className="fa-solid fa-angle-left"></i> Previous
        </button>
        <span className="px-4 py-2 mx-1 text-[#9e9dba] bg-[#272727] rounded">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-[#9e9dba] bg-[#272727] rounded disabled:opacity-50"
        >
          Next <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

export default ListFilm;
