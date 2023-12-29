import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsChevronDown } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux'
import { invoicerFunc, dueDaterFunc } from '../../redux/firstDivSlices/calenderSlice';

const Calender = () => {

const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
const calenders = useSelector((state)=>state.calenders)
const dispatch = useDispatch()

console.log(calenders)

const handleStartDateChange = (date) => {
  setStartDate(date);
  dispatch(invoicerFunc({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }));
};

const handleEndDateChange = (date) => {
  // Bitiş tarihi, başlangıç tarihinden önce seçilemez
  if (date < startDate) {
    console.error('Bitiş tarihi, başlangıç tarihinden önce seçilemez');
  } else {
    setEndDate(date);
    dispatch(dueDaterFunc({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }))
  }
};

useEffect(() => {
  const currentDate = new Date();
  setStartDate(currentDate);
  dispatch(
    invoicerFunc({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    })
    
  );
}, [dispatch]);
useEffect(() => {
  const currentDate = new Date();
  setEndDate(currentDate);
  dispatch(
    dueDaterFunc({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    })
    
  );
}, [dispatch]);

return (
  <div className='w-[377.005px] h-[102.88px]'>

    <div className='w-[377.005px] h-[102.88px]'>
        <div className='h-full w-full flex justify-center relative'>

          <div className='w-[188.49px] h-full flex flex-col items-center'>
            <div className='w-[164.40px] h-[78.88px] mb-[24px] flex flex-col'>
              <label className=' '>Invoice date</label>
              <DatePicker 
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="MMM d, yyyy"
                className='w-full h-[48px] border-black border-[1px] flex items-center mt-[9.19px]'
              /> {/* sign */}
              <div className='absolute top-[50%] right-[10px] transform -translate-y-1/2'>
                <BsChevronDown />
              </div>
            </div>
          </div>

          <div className='w-[188.49px] h-full flex flex-col items-center'>
            <div className='w-[164.40px] h-[78.88px] mb-[24px] flex flex-col'>
              <label className=' '>Due date</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="MMM d, yyyy"
                className='w-full h-[48px] border-black border-[1px] flex items-center mt-[9.19px]'
              /> {/* sign */}
              <div className='absolute top-[50%] right-[10px] transform -translate-y-1/2'>
                <BsChevronDown />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
)

};

export default Calender