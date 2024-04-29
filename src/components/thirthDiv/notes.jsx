import React from "react";
import { useDispatch } from 'react-redux'
import { note, bank } from "../../redux/thirdDivSlices/noteSlice";

const Notes = () => {
    const dispatch = useDispatch()
    
    return (
        <div className='w-[377px] h-[431.67px] flex flex-col items-center'>


              <div className='w-[353px] h-[175.83px] mt-[40px] mb-[20px] flex flex-col'>
                <label className='mb-[10.13px] h-[21.7px]'>Notes / payment terms</label>
                  <textarea 
                    onChange={e => dispatch(note(e.target.value))}
                    className='w-[353px] h-[144px] border-black border-[1px]' 
                    placeholder='Payment is due within 15 days'>
                </textarea>
              </div>

              <div className='w-[353px] h-[175.83px] mb-[20px]'>
                <label className='mb-[10.13px] h-[21.7px]'>Bank account details</label>
                  <textarea 
                    onChange={e => dispatch(bank(e.target.value))}
                    className='mt-[10.13px] w-[353px] h-[144px] border-black border-[1px]'>
                  </textarea>
              </div>
        </div>
    )
}

export default Notes