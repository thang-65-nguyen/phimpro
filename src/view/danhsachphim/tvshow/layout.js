import React from "react";
import AppNavbar from "../../nav";
import Footer from "../../footer";
import ListFilmTVSHow from ".";

const LayoutListFilmTVShow = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="max-w-[1600px] mx-auto w-full">
        <AppNavbar />
        <ListFilmTVSHow />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutListFilmTVShow;
