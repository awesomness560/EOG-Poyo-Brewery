import React from 'react';

import TopNavigation from '../Components/TopNavigation';


const Home:React.FC = () => {

  return (
    <div className="flex justify-center bg-cover bg-center relative h-[3000px] w-full" 
         style={{backgroundImage: "url('assets/HomeBG.svg')", overflow: 'hidden'}}> 
         <TopNavigation /> 

    </div>
    
  );
};



export default Home;