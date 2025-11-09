import React from 'react'
import TopNavigation from '../Components/TopNavigation';

const History: React.FC = () => {
  return (
    <div className="flex justify-center bg-cover bg-center relative h-[1500px] w-full" 
         style={{backgroundImage: "url('assets/HistoryBG.svg')", overflow: 'hidden'}}>  
        <TopNavigation />
         
         <img className="absolute left-35 bottom-70" src="/assets/PoyoCauldron.svg"/>
    </div>
  )
}

export default History