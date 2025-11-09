import React from 'react'
import TopNavigation from '../Components/TopNavigation';
import { AnimatePresence, delay, motion, useScroll } from 'framer-motion'

const Predictions: React.FC = () => {
  return (
    <div className="flex justify-center bg-cover bg-center relative h-[3000px] w-full" 
         style={{backgroundImage: "url('assets/PredictionBG.svg')", overflow: 'hidden'}}>  
         

      <motion.div className="flex relative w-full h-full justify-center scale-90" 
                  initial={{y:40, opacity: 0}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
        <img className="absolute" src="/assets/CrystalBall.svg"/>
        <motion.img className="absolute " src="/assets/BallGoop.svg" initial={{rotate: 0}} animate={{rotate: 360}} transition={{repeat: Infinity, duration: 15, ease: 'linear'}} />
      </motion.div>
      <TopNavigation />
    </div>
  )
}

export default Predictions