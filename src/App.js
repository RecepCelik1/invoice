import React, {  } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FirstDiv from './components/firstDiv/firstDIV.jsx';
import SecondDiv from './components/secondDiv/secondDIV.jsx';
import ThirdDiv from './components/thirthDiv/thirdDIV.jsx';
import FourthDiv from './components/fourthDiv.jsx';
import { useSelector } from 'react-redux';

function App() {

  const height = useSelector(state => state.dataStore.dynamicHeight)
  const h1 = 1060.17 
  const h2 = 1044.17
  console.log('height : ', height)
  return (
      <div className='flex flex-col items-center'>
        <div className={`relative w-[858px] h-[${h1 + height}] flex flex-col items-center rounded-[30px] shadow-2xl mt-[150px] mb-[200px]`}>
          <div className={`absolute top-0 left-0 w-full h-[${h1 + height}] bg-cover bg-center rounded-[31.5px] bg-[#f97316]`}></div>
          <div className={`relative w-full h-[${h1 + height}] bg-white rounded-[30px] flex items-center justify-center`}>
            <div className={`bg-white w-[793.99px] flex flex-col items-center`}>
        
                <FirstDiv />
                <SecondDiv />
                <ThirdDiv />
                <FourthDiv />

            </div>

        </div>
      </div>
    </div>
    
  );
}

export default App;
