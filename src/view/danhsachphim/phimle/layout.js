import React from "react";
import AppNavbar from "../../nav";

import Footer from "../../footer";
import ListFilm from ".";

const LayoutListFilm = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="max-w-[1600px] mx-auto w-full">
        <AppNavbar />
        <ListFilm />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutListFilm;
