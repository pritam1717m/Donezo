import React from "react";
import Donezo_logo from "../assets/Donezo_logo.png";
import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

function Navbar({ toggle, onToggleBg }) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className={`w-full h-20 border-b-2  ${toggle ? "border-white/10" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex ml-5 ">
          <Link to="/" className="max-md:flex-1">
            <img
              src={Donezo_logo}
              className="w-40 h-auto"
              alt="Logo of Donezo app"
            />
          </Link>
        </div>
        <div>
             {user && (
            <span className="text-sm text-gray-500 mr-7">Hi, {user.name}</span>
          )}
          <button className="text-sm mr-7 text-gray-400 hover:text-red-500 cursor-pointer" onClick={handleLogOut}>Logout</button>
        </div>
        <div className="flex  p-2 mr-5 rounded-md hover:bg-gray-900 hover:text-gray-300">
         
          <ToggleTheme toggle={toggle} onToggleBg={onToggleBg} />
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
