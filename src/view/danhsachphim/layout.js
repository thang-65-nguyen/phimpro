import React from "react";
import AppNavbar from "../nav";
import ListFilm from ".";
import Footer from "../footer";


const LayoutListFilm = () => {
  return (
    <div className="bg-black max-w-[1600px] w-full">
      <AppNavbar />
      <ListFilm />
      <Footer/>
    </div>
  );
};

export default LayoutListFilm;
