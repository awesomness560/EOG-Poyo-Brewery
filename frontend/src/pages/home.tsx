import React from "react";
import TopNavigation from "../Components/TopNavigation";
import { motion } from 'framer-motion'
import MapIcon from '@mui/icons-material/Map';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
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

      
      <div className="relative flex items-center justify-center"
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
            width: "100vw",   
            height: "150vh",  
            objectFit: "cover",
            display: "block",
          }}
        />
        <motion.div className="absolute -top-20 flex w-full h-auto justify-center scale-90 flex-col items-center mt-30" 
                  initial={{y:40, opacity: 0}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>

          <img className="" src="/assets/Logo.svg"/>
          <span className="text-white text-4xl font-black mt-20" >
            Where Would You Like To Go?
          </span>
          <div className="w-[50%] flex h-full flex-row gap-10 items-center justify-center">
            <div className="bg-containerColor mt-8 h-[110px] w-[115px] flex flex-col items-center justify-center rounded-xl hover:scale-110 transition duration-200"
                          onClick={() => navigate('/map')}>
              <MapIcon sx={{ color: 'white', fontSize: 60 }}/>
              <span className="text-white font-bold text-xl">
                Map
              </span>
            </div>
            <div className="bg-containerColor mt-8 h-[110px] w-[115px] flex flex-col items-center justify-center rounded-xl hover:scale-110 transition duration-200"
                onClick={() => navigate('/history')}>

              <HistoryEduIcon sx={{ color: 'white', fontSize: 60 }}/>
              <span className="text-white font-bold text-xl">
                History
              </span>
            </div>
            <div className="bg-containerColor mt-8 h-[110px] w-[115px] flex flex-col items-center justify-center rounded-xl hover:scale-110 transition duration-200"
                onClick={() => navigate('/predictions')}>

              <AutoAwesomeIcon sx={{ color: 'white', fontSize: 60 }}/>
              <span className="text-white font-bold text-xl">
                Predictions
              </span>
            </div>
          </div>
        </motion.div>
        <img className="absolute -bottom-35 left-15"
              src="/assets/Poyo.svg"
      
      ></img>
      </div>
    </div>

  );
};

export default Home;
