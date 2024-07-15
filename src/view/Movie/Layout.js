import React from "react";
import AppNavbar from "../nav";
import WatchMovie from "./MovieInfo";
import Footer from "../footer";

const LayoutMovie = () => {
  return (
    <div className="bg-[#0f0f0f] h-[100vh]">
      <div className=" max-w-[1600px] w-full mx-auto">
        <AppNavbar />
        <WatchMovie />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutMovie;
