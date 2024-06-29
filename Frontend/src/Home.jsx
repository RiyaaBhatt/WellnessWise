import React from 'react'
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services.jsx";
import Banner from "./components/Banner/Banner.jsx";
import AppStore from "./components/AppStore/AppStore.jsx";
import CoverBanner from "./components/CoverBanner/CoverBanner.jsx";
import Testimonial from "./components/Testimonial/Testimonial.jsx";
import About from "./components/About/About.jsx";

const Home = () => {
  return (
    <div>
      
      <Hero />
      <Services />
      <Banner />
      <About/>
      {/* <CoverBanner /> */}
      
      <Testimonial />
    </div>
  )
}

export default Home;
