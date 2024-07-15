import React from "react";
import AppNavbar from "../../nav";
import Footer from "../../footer";

import ListFilmPhimBo from ".";

const LayoutListFilmPhimBo = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="max-w-[1600px] mx-auto w-full">
        <AppNavbar />
        <ListFilmPhimBo />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutListFilmPhimBo;
