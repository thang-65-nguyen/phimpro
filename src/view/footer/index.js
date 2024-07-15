import React from "react";

const Footer = () => {
  return (
    <div className="px-2 py-10 w-full max-w-[1600px] mx-auto text-center bg-[#0f0f0f]">
      <div class="mt-10 mb-10 flex justify-center items-center gap-4">
        <div class="h-0.5 flex-1 to-80% bg-[#242424]"></div>
        <div class="text-2xl text-[#fdd958] font-bold tracking-wider">
          Phim Pro
        </div>
        <div class="h-0.5 flex-1  to-80% bg-[#242424]"></div>
      </div>
      <div className="mt-10 text-center text-base flex-wrap w-[99%] mx-auto text-[#a09eba]">
        Copyright ©2024 All rights reserved | This website is made with by ❤
        Thang
      </div>
    </div>
  );
};

export default Footer;
