import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const AppHeader = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const navigate = useNavigate();
  const [headerResponsive, setHeaderResponsive] = useState(false);
  const handleResponsive = () => {
    setHeaderResponsive(!headerResponsive);
  };
  const handleClose = () => {
    setHeaderResponsive(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tim-kiem?keyword=${encodeURIComponent(searchMovie)}&limit=10`);
    setSearchMovie("");
  };
  return (
    <div className="text-white">
      <div className="w-[1140px] HeaderLaptop mx-auto">
        <Link to="/">Logo</Link>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            className="text-black ps-3 pe-8 w-[300px] rounded-md border-none outline-none py-2"
            placeholder="Tìm kiếm tên phim..."
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <div className="absolute top-[50%] translate-y-[-50%] right-2">
            <i className="fa fa-search text-[#222]"></i>
          </div>
        </form>
        <div className="flex items-center gap-x-2">
          <button>Đăng nhập</button>
          <button>Đăng ký</button>
        </div>
      </div>
      <div className="HeaderMobile">
        <h2>Logo</h2>
        <i
          className="fa-solid fa-bars cursor-pointer"
          onClick={handleResponsive}
        ></i>
        {headerResponsive && (
          <nav className="w-[390px] h-full fixed top-0 left-0 bg-black z-10 opacity-[1]">
            <div className="p-4">
              <div onClick={handleClose} className="text-right cursor-pointer">
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <ul className="text-center px-4">
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <Link to="/">Trang chủ</Link>
              </li>
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                Thể loại
              </li>
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                Trạng thái
              </li>
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                xem nhiều
              </li>
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                Bình luận nhiều
              </li>
              <li
                className="uppercase text-sm px-3 pb-3"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                Lưỡng long nhất thể
              </li>
              <li className="uppercase text-sm px-3 pb-3">Năm</li>
            </ul>
            <form onSubmit={handleSearch} className="relative px-4 mb-2">
              <input
                type="search"
                className="text-black ps-3 pe-8 w-[358px] rounded-md border-none outline-none py-2"
                placeholder="Tìm kiếm tên phim..."
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}
              />
              <div className="absolute top-[50%] translate-y-[-50%] right-6">
                <i className="fa fa-search text-[#222]"></i>
              </div>
            </form>
            <div className="flex items-center justify-center gap-x-2">
              <button>Đăng nhập</button>
              <button>Đăng ký</button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
