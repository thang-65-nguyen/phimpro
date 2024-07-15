import React from "react";
import AppNavbar from "../nav";
import AppBanner from "../banner";
import "./style.css";
import Home from "./Home";
import Footer from "../footer";

const LayoutHome = () => {
  // const [searchMovie, setSearchMovie] = useState("");
  // const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   navigate(`/tim-kiem?keyword=${encodeURIComponent(searchMovie)}`);
  //   setSearchMovie("");
  // };

  return (
    <div className="bg-[#0f0f0f]">
      <div className="mx-auto max-w-[1600px] w-full overflow-x-visible">
        <AppNavbar />
        <AppBanner />
        <div className="md:px-6 px-6 mx-auto bg-[#0f0f0f] text-white pt-10">
          {/* <div>
            <h2 className="text-3xl">Tìm Kiếm</h2>
            <div className="px-10 mt-10">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  className="py-5 px-4 w-full outline-none bg-[#272727] text-[#a09eba] text-xl"
                  placeholder="Nhập tên phim cần tìm..."
                  value={searchMovie}
                  onChange={(e) => setSearchMovie(e.target.value)}
                />
              </form>
            </div>
          </div> */}
          <div class="mt-10 mb-10 flex justify-center items-center gap-4">
            <div class="h-0.5 flex-1 to-80% bg-ct-left to-transparent"></div>
            <div class="text-2xl text-[#fdd958] font-bold tracking-wider">
              Phim mới cập nhật
            </div>
            <div class="h-0.5 flex-1  to-80% bg-ct-right to-transparent"></div>
          </div>
          <div className="mt-5">
            <Home
              apiEndpoint="https://phimapi.com/v1/api/danh-sach/phim-bo"
              title="Phim Bộ"
              link="/phim-bo"
            />
          </div>
          <div className="mt-5">
            <Home
              apiEndpoint="https://phimapi.com/v1/api/danh-sach/phim-le"
              title="Phim Lẻ"
              link="/phim-le"
            />
          </div>
          <div className="mt-5">
            <Home
              apiEndpoint="https://phimapi.com/v1/api/danh-sach/hoat-hinh"
              title="Hoạt Hình"
              link="/hoat-hinh"
            />
          </div>
          <div className="mt-5">
            <Home
              apiEndpoint="https://phimapi.com/v1/api/danh-sach/tv-shows"
              title="TV Show"
              link="/tv-show"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutHome;
