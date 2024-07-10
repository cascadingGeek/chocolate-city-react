import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Albums from "../src/pages/Albums";
import Tweets from "../src/pages/Tweets/index";
import Artists from "../src/pages/Artists/index";
import logo from "./static/images/logo.png";
import Home from "./custom/Home";
import { RiMenu4Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="bg-[#02021a] text-white h-[100vh] w-full font-oswald relative">
      <Router>
        <nav className="w-full h-auto p-5 items-center justify-between fixed top-0 left-0 z-30 bg-[#02021a] flex">
          <Link to="/">
            {" "}
            <img src={logo} className="w-20 h-auto" alt="logo" />{" "}
          </Link>
          <ul className="hidden md:flex lg:flex xl:flex 2xl:flex items-center gap-20 w-full justify-center">
            <li className="cursor-pointer">
              <Link to="/artists">Artists</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/albums">Albums</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/tweet">Tweets</Link>
            </li>
          </ul>

          <div
            className="absolute top-8 right-5 z-40"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {showMenu ? (
              <IoMdClose className="text-2xl text-[#02021a] inline-block md:hidden lg:hidden xl:hidden 2xl:hidden" />
            ) : (
              <RiMenu4Line className="text-2xl text-white inline-block md:hidden lg:hidden xl:hidden 2xl:hidden" />
            )}
          </div>

          {showMenu && (
            <ul className="h-[100vh] w-1/2 bg-gray-300 absolute top-0 right-0 flex flex-col gap-10 text-black pt-20 font-medium text-base text-center">
              <li onClick={() => setShowMenu(false)}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link to="/artists">Artists</Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link to="/albums">Albums</Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link to="/tweet">Tweets</Link>
              </li>
            </ul>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tweet" element={<Tweets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
