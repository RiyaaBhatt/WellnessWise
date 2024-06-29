import React from "react";
import Logo from "../../assets/food-logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Link, NavLink } from 'react-router-dom';

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 4,
    name: "Diet",
    link: "/Diet",
  },
  {
    id: 5,
    name: "Recipes",
    link: "/recipe",
  }
];
  var logged = localStorage.getItem('logged')
  var username = localStorage.getItem('username')
  const isAdmin = localStorage.getItem("role") === "admin";
const Navbar = () => {
  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <Link to="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                WellnessWise
              </Link>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <NavLink
                      to={menu.link}
                      className="inline-block py-4 px-4 hover:text-yellow-500"
                    >
                      {menu.name}
                    </NavLink>
                  </li>
                ))}
                {isAdmin && (
                <li>
                  <Link
                    to="/AllUsers"
                    className="inline-block py-4 px-4 hover:text-yellow-500"
                  >
                    Users
                  </Link>
                </li>
              )}
              </ul>
              { logged ? (
              <div style={{color:'red'}}>
                <Link to='/Profile'>
                {username}
                </Link>
                <Link to="/" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3" onClick={()=>{localStorage.clear();Navigator.navigate('/')}}>
                Logout
              </Link>
              </div>

              ): (<Link to="/LoginSignUp" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                Login
              </Link>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
