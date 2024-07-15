import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [searchMovie, setSearchMovie] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tim-kiem?keyword=${encodeURIComponent(searchMovie)}`);
    setSearchMovie("");
  };

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <div
      className={`fixed z-[99] left-0 right-0 top-0 ${
        isScrolled ? "bg-[#272727]" : "bg-transparent"
      }`}
    >
      <nav className="py-4 max-w-[1600px] w-full mx-auto text-[#9e9dba] h-[70px] flex justify-between items-center min-[840px]:px-8 px-4">
        <Link to="/" className="md:h-[60px] h-[55px]">
          <img
            src="https://phimpro-nhidev-nhidevelopers-projects.vercel.app/assets/phimpro_logo-C7OlI0nd.png"
            className="h-full"
            alt=""
          />
        </Link>
        <div className="block md:block lg:hidden">
          <i
            className="fa-solid fa-bars text-2xl cursor-pointer"
            onClick={toggleMenu}
          ></i>
          {isMenuOpen && (
            <div className="text-center h-full w-[270px] bg-[#272727] fixed top-0 right-0 leading-9">
              <div className="relative">
                <div
                  className="bg-[#414141] relative py-4 font-bold text-white"
                  style={{ borderBottom: "1px solid #a09eba" }}
                >
                  <span className="text-xl">Danh mục</span>
                  <div className="absolute top-[50%] left-3 translate-y-[-50%] transform">
                    <i
                      className="fa-solid fa-xmark text-xl me-10 cursor-pointer"
                      onClick={handleClose}
                    ></i>
                  </div>
                </div>

                <NavLink to="/" isActive={activeLink === "/"}>
                  Trang Chủ
                </NavLink>
                <NavLink to="/phim-le" isActive={activeLink === "/phim-le"}>
                  Phim Lẻ
                </NavLink>
                <NavLink to="/phim-bo" isActive={activeLink === "/phim-bo"}>
                  Phim Bộ
                </NavLink>
                <NavLink to="/hoat-hinh" isActive={activeLink === "/hoat-hinh"}>
                  Hoạt Hình
                </NavLink>
                <NavLink to="/tv-show" isActive={activeLink === "/tv-show"}>
                  TV Show
                </NavLink>
                <form
                  onSubmit={handleSearch}
                  className="mx-2 mt-2 relative text-[#a09eba]"
                >
                  <input
                    type="search"
                    className="py-2 px-3 w-full outline-none bg-transparent border-[#a09eba] border rounded-2xl text-[#a09eba] text-sm"
                    placeholder="Nhập tên phim cần tìm..."
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                  />
                  <i class="fa-solid fa-magnifying-glass absolute top-[50%] translate-y-[-50%] right-3"></i>
                </form>
              </div>
              <div className="absolute text-base font-light block bottom-4 right-0 left-0">
                <div>Copyright ©2024</div>
                <div>ThangDeveloper</div>
              </div>
            </div>
          )}
        </div>
        <div className="md:hidden lg:flex items-center gap-x-2 hidden">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              className="py-2 ipad-pro:text-sm px-6 w-full outline-none bg-transparent border-[#a09eba] border rounded-md text-xl"
              placeholder="Nhập tên phim cần tìm..."
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
            />
          </form>
          <NavLink to="/" isActive={activeLink === "/"}>
            Trang Chủ
          </NavLink>
          <NavLink to="/phim-le" isActive={activeLink === "/phim-le"}>
            Phim Lẻ
          </NavLink>
          <NavLink to="/phim-bo" isActive={activeLink === "/phim-bo"}>
            Phim Bộ
          </NavLink>
          <NavLink to="/hoat-hinh" isActive={activeLink === "/hoat-hinh"}>
            Hoạt Hình
          </NavLink>
          <NavLink to="/tv-show" isActive={activeLink === "/tv-show"}>
            TV Show
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

const NavLink = ({ to, isActive, children }) => (
  <Link
    to={to}
    className={`px-3 block font-bold md:text-lg ipad-pro:text-base text-xl py-2 cursor-pointer hover:[text-shadow:_0_0_4px_#ffd3338f]  hover:text-[#ddb33e] ${
      isActive ? "text-[#ddb33e] [text-shadow:_0_0_4px_#ffd3338f]" : ""
    }`}
  >
    {children}
  </Link>
);

export default AppNavbar;
