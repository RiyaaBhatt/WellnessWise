import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./Home.jsx";
import LoginSignUp from "./components/Login/LoginSignUp.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import ShowingDiet from "./components/diet/ShowingDiet.jsx";
import AllUsers from "./components/AllUsers/AllUsers.jsx";
import Recipes from "./components/Recipe/Recipes.jsx";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  localStorage.setItem('logged',false)
  return (
    
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <BrowserRouter className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/personal' element={<Personal/>}/>
        <Route path='/personal/:id' element={<PersonalDetails />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<NotFound/>}/> */
        }
      <Route path='/LoginSignUp' element={<LoginSignUp/>}/>
      <Route path='/Profile' element={<UserProfile/>}/>
      <Route path='/Diet' element={<ShowingDiet/>}/>
      <Route path='/AllUsers' element={<AllUsers/>}/>
      <Route path='/Recipe' element={<Recipes/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </div>
  );
};

export default App;
