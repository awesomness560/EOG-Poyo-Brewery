import React from "react";
import TopNavigation from "../Components/TopNavigation";

const Home: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
    
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <TopNavigation />
      </div>

      
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "auto", 
        }}
      >
        <img
          src="/assets/HomeBG.svg"
          alt="Background"
          style={{
            width: "150vw",   
            height: "150vh",  
            objectFit: "cover", 
            display: "block",
          }}
        />
        <img
      src="/assets/Poyo.svg"
      style={{
          position: "fixed",
          top: 780,
          left: 80,
          zIndex: 4,
        }}
      
      ></img>
      </div>
    </div>

  );
};

export default Home;
