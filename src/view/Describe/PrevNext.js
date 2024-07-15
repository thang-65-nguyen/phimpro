import React from "react";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute z-[1] top-1/2 left-4 transform -translate-y-1/2 text-white hover:bg-[#272727] hover:bg-opacity-75 rounded-full w-14 h-14 flex items-center justify-center"
    >
      <i className="fa-solid fa-angle-left text-2xl"></i>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute z-[1] top-1/2 right-4 transform -translate-y-1/2 text-white hover:bg-[#272727] hover:bg-opacity-75 rounded-full w-14 h-14 flex items-center justify-center"
    >
      <i className="fa-solid fa-angle-right text-2xl"></i>
    </button>
  );
};

export { CustomPrevArrow, CustomNextArrow };
