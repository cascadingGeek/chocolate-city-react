import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import banner from "../static/images/hand.png";

const Home = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-full flex flex-col items-center md:items-start lg:items-start xl:items-start 2xl:items-start justify-center pl-5 md:pl-10 lg:pl-20 xl:pl-20 2xl:pl-20">
        <p className="text-xs md:text-sm lg:text-base xl:text-base 2xl:text-lg mb-5">
          {" "}
          Welcome to Chocolate City{" "}
        </p>
        <h1 className="mb-10 text-[30px] md:text-[40px] lg:text-[65px] xl:text-[70px] 2xl:text-[100px] font-black text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
          Where words fail, <br /> music speaks.{" "}
        </h1>
        <Link to="/artists">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent text-xl px-10 py-3"
          >
            {" "}
            Explore{" "}
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-full flex items-center justify-end pt-20 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0">
        <img src={banner} className="w-[90%] h-auto" alt="banner" />{" "}
      </div>
    </div>
  );
};
export default Home;
