import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import banner from "../static/images/hand.png";

const Home = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-full flex flex-col items-start justify-center pl-20">
        <p className="text-base mb-5"> Welcome to Chocolate City </p>
        <h1 className="mb-10 text-[70px] font-black">
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
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-full flex items-center justify-end">
        <img src={banner} className="w-[90%] h-auto" alt="banner" />{" "}
      </div>
    </div>
  );
};
export default Home;
