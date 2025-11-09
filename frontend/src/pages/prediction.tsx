import React, { useRef } from 'react'
import TopNavigation from '../Components/TopNavigation';
import { motion } from 'framer-motion'

const Predictions: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollToTarget = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <div className="flex bg-cover bg-center relative h-[3000px] w-full flex-col items-center" 
         style={{backgroundImage: "url('assets/PredictionBG.svg')", overflow: 'hidden'}}>  
  
      <motion.div className="flex relative w-full h-auto justify-center scale-90 flex-col items-center mt-30" 
                  initial={{y:40, opacity: 0}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
        <span className="flex text-white text-4xl" style={{fontFamily: 'TitanOne-Regular'}}>
          You Look To The Stars To Predict...
        </span>
        <div className="flex w-full h-[550px] items-center justify-center relative select-none" >
          <img className="absolute scale-80 top-0 drop-shadow-fuchsia-400 drop-shadow-2xl" src="/assets/CrystalBall.svg" onClick={scrollToTarget}/>
          <motion.img className="absolute scale-80 mt-3 top-0 select-none" src="/assets/BallGoop.svg" initial={{rotate: 0}} animate={{rotate: 360}} transition={{repeat: Infinity, duration: 15, ease: 'linear'}} onClick={scrollToTarget}/>
        </div>
      </motion.div>

      <div className="bg-containerColor w-[70%] h-[1000px] flex mt-30 rounded-xl" ref={targetRef}>
      </div>

      <TopNavigation />
    </div>
  )
}

export default Predictions