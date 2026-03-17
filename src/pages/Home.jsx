import React from "react";

// Components
import Slide from "../components/Slider.jsx";
import Galary from "../components/Galary.jsx";

// Pages / Sections
import OurVision from "./BEU-S/Vision.jsx";
import Hero from "./Hero.jsx";


// Home Sections
import OurServices from "./Home/Services.jsx";
import Tree from "./Home/Tree.jsx";
import About from "./Home/About.jsx";
import InternshipAboutDark  from "./Home/InternshipAboutDark.jsx";
import WeProvide from "./Home/WeProvide.jsx";
function Home() {
  return (
    <>
      {/* Hero Slider */}
      <Slide />
      <Hero />

    

      {/* BEU Section */}
     
      {/* We Provide */}
      <WeProvide />

      <InternshipAboutDark />
      
      {/* About */}
      <About />



  
      {/* Services */}
  
      {/* Tree Section */}
      <Tree />



     

      {/* Gallery */}
      <Galary />
    </>
  );
}

export default Home;
