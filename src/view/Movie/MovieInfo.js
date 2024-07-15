import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const WatchMovie = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [finalUrl, setFinalUrl] = useState("");
  const [paginationIndex, setPaginationIndex] = useState(0);
  const episodesPerPage = 100;
  const location = useLocation();
  const { episode } = location.state || {};
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchApiData = async () => {
      try {
        const response = await fetch(`https://phimapi.com/phim/${slug}`);
        console.log(response, "rs");
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

        if (episode) {
          const episodeIndex = episodes.findIndex(
            (ep) => ep.name === episode.name
          );
          if (episodeIndex !== -1) {
            setCurrentEpisodeIndex(episodeIndex);
            setFinalUrl(episodes[episodeIndex].link_embed);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiData();
  }, [slug, episode]);

  useEffect(() => {
    if (episodes.length > 0) {
      setFinalUrl(episodes[currentEpisodeIndex].link_embed);
    }
  }, [episodes, currentEpisodeIndex]);

  const handleEpisodeClick = (index) => {
    setCurrentEpisodeIndex(index);
  };

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => (prevIndex + 1) % episodes.length);
  };
  const handlePrevEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => (prevIndex - 1) % episodes.length);
  };
  const handlePaginationClick = (startIndex) => {
    setPaginationIndex(startIndex);
  };
  useEffect(() => {
    if (movie) {
      document.title =
        movie.name +
        " / " +
        movie.origin_name +
        " " +
        episodes[currentEpisodeIndex].name +
        " " +
        movie.lang +
        " 1080p";
    } else {
      document.title = "Phim Mới";
    }
  }, [movie]);
  return (
    <div className="px-4 pt-[120px] flex mx-auto bg-[#0f0f0f]">
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
        <div className="block w-full">
          {error && <p>{error}</p>}
          {finalUrl ? (
            <div className="md:px-8">
              <div className="md:hidden flex text-[#9e9dba] mb-7">
                {movie?.name} - {movie?.origin_name} - {movie?.year} - 1080p -{" "}
                {movie?.lang} - {episodes[currentEpisodeIndex].name}
              </div>
              <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-[#0f0f0f]">
                <div className="md:flex hidden absolute top-0 left-0 z-30 mb-10 px-5 font-bold md:text-2xl text-sm text-[#9e9dba] items-center mt-3 gap-2">
                  <div>
                    {movie?.name} - {movie?.origin_name} - {movie?.year} - 1080p
                    - {movie?.lang} - {episodes[currentEpisodeIndex].name}
                  </div>
                </div>
                <iframe
                  src={finalUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Video Player"
                ></iframe>
              </div>

              <div className="flex justify-center items-center mt-3 gap-2 text-[#d4d4d4]">
                {currentEpisodeIndex > 0 && (
                  <button
                    onClick={handlePrevEpisode}
                    className="me-2 cursor-pointer text-2xl"
                  >
                    <i className="fa-solid fa-backward-step text-[#757778]"></i>{" "}
                    Tập sau
                  </button>
                )}
                {currentEpisodeIndex < episodes.length - 1 && (
                  <button
                    onClick={handleNextEpisode}
                    className="cursor-pointer text-2xl"
                  >
                    <i className="fa-solid fa-forward-step text-[#757778]"></i>{" "}
                    Tập tiếp
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="w-full px-8">
            <div className="grid md:grid-cols-10 grid-cols-2  gap-4 flex-wrap">
              {episodes.length > episodesPerPage &&
                [...Array(Math.ceil(episodes.length / episodesPerPage))].map(
                  (_, index) => (
                    <>
                      <h3 className="text-white text-3xl my-6">
                        Chọn Danh Sách Tập
                      </h3>
                      <div
                        className="grid w-full cursor-pointer duration-200 hover:text-[#d3b235] font-medium h-12 text-xl place-content-center bg-[#272727] text-[#a2a0bd] rounded-md"
                        key={index}
                        onClick={() =>
                          handlePaginationClick(index * episodesPerPage)
                        }
                      >
                        {index * episodesPerPage + 1}-
                        {Math.min(
                          (index + 1) * episodesPerPage,
                          episodes.length
                        )}
                      </div>
                    </>
                  )
                )}
            </div>
            <h3 className="text-white text-3xl my-6">Danh Sách Tập</h3>
            <div className="grid md:grid-cols-10 grid-cols-2 gap-4 flex-wrap">
              {episodes
                .slice(paginationIndex, paginationIndex + episodesPerPage)
                .map((episode, index) => (
                  <div
                    className="grid w-full cursor-pointer duration-200 hover:text-[#d3b235] font-medium h-12 text-xl place-content-center bg-[#272727] text-[#a2a0bd] rounded-md"
                    key={index + paginationIndex}
                    onClick={() => handleEpisodeClick(index + paginationIndex)}
                  >
                    {episode.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchMovie;
