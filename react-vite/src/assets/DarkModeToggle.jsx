import React from 'react';
import { CgMoon, CgSun } from "react-icons/cg";

function DarkModeToggle({ isDarkMode, toggleDarkMode }) { 

  const handleClick = () => {
    toggleDarkMode(); 
  };

  return (
    <div 
      onClick={handleClick}
      className="text-grey  p-2  mt-4 cursor-pointer"
    >
      {isDarkMode ? <CgMoon style={{ color: 'white' }} /> : <CgSun/>}
    </div>
  );
}

export default DarkModeToggle;
