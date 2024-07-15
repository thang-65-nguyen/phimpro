import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bgFilm from "../../assets/img/bg-film.png";

const ListFilm = () => {
  const [movie, setMovie] = useState({
    seoOnPage: {},
    items: [],
    titlePage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApiData = async (page = 1) => {
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/danh-sach/phim-le?limit=32&page=${page}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Không thể kết nối đến API thể loại");
      }
      const data = await response.json();
      console.log(data);

      const { seoOnPage, items, titlePage, params } = data.data;
      setMovie({ seoOnPage, items, titlePage });

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

  return (
    <>
      <div className="relative w-full">
        <div
          className="h-[440px] bg-right-top bg-cover"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15, 15, 15, 0.2) 0%, rgb(15, 15, 15) 96%), url(https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/wallpaper-72tiVneq.png)",
          }}
        />
        <div className="absolute top-[40%] left-[10%]">
          <>
            {movie && (
              <h2 className="text-white text-6xl mb-5">{movie.titlePage}</h2>
            )}
            {movie && movie.seoOnPage && (
              <div className="text-[#9e9dba] text-3xl leading-10 w-[980px]">
                {movie.seoOnPage.descriptionHead}
              </div>
            )}
          </>
        </div>
      </div>

      <div className="grid pt-[20px] gap-4 text-white xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:px-8 px-6 pb-10">
        {movie.items.length > 0 ? (
          movie.items.map((movie, index) => (
            <Link
              to={`/DescribeFilm/${movie.slug}`}
              key={index}
              className="w-full h-[450px] flex flex-col rounded hover:bg-[#272727] hover:scale-110 duration-200 shadow-xl shadow-transparent hover:shadow-black/40 group"
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
          <p>Không có phim nào được tìm thấy.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 text-white bg-gray-800 rounded">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListFilm;
