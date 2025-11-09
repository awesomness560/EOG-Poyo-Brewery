import React, { useEffect, useState } from 'react'
import TopNavigation from '../Components/TopNavigation';
import { motion } from 'framer-motion'
import { getDashboardData } from '../api';

const Map:React.FC = () => {

  const [dashBoardData, setData] = useState([])

  useEffect(() => {

    console.log(getDashboardData())
  }, [dashBoardData])

  return (
    <div className="flex justify-center bg-cover bg-center relative min-h-screen w-full items-center" 
         style={{backgroundImage: "url('assets/MapBG.svg')", overflow: 'hidden'}}>  
      <TopNavigation />
      <div className="flex flex-row mt-25 justify-center w-[70%] h-full items-center">

      <motion.div className="flex bg-amber-200 h-[420px] w-[100px] rounded-md" initial={{x:0}} animate={{x:-400}} transition={{type: 'tween', duration: 1}} />
      <motion.div className="flex bg-amber-200 h-[400px] w-[100px] rounded-md" initial={{scaleX:1}} animate={{scaleX:10}} transition={{type: 'tween', duration: 1}}>

      </motion.div>
      <motion.div className="flex bg-amber-200 h-[420px] w-[100px] rounded-md" initial={{x:0}} animate={{x:400}} transition={{type: 'tween', duration: 1}} />      
      </div>
    </div>
  )
}

export default Map