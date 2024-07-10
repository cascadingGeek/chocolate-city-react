import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Albums from "../src/pages/Albums";
import Tweets from "../src/pages/Tweets/index";
import Artists from "../src/pages/Artists/index";
import logo from "./static/images/logo.png";
import Home from "./custom/Home";

function App() {
  return (
    <div className="bg-[#02021a] text-white h-[100vh] w-full font-oswald relative">
      <Router>
        <nav className="w-full h-auto p-5 flex items-center fixed top-0 left-0 z-30 bg-[#02021a]">
          <Link to="/">
            {" "}
            <img src={logo} className="w-20 h-auto" alt="logo" />{" "}
          </Link>
          <ul className="flex items-center gap-20 w-full justify-center">
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <Link to="/tweet">Tweets</Link>
            </li>
          </ul>
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
