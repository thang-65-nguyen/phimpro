import React from "react";
import DescribeMovie from ".";

import AppNavbar from "../nav";
import Footer from "../footer";

const LayoutDescribe = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="max-w-[1600px] w-full mx-auto">
        <AppNavbar />
        <DescribeMovie />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutDescribe;
