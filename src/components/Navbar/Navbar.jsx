import React from "react";
function Navbar() {
  return (
    <nav className="flex p-10 justify-between items-center w-screen bg-slate-400 mb-10">
      <h3 className="text-3xl">LOGO</h3>
      <h3 className="text-3xl">
        <i className="fa-solid fa-bars cursor-pointer"></i>
      </h3>
    </nav>
  );
}

export default Navbar;
