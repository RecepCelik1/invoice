import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { company, bill } from '../../redux/firstDivSlices/detailSlice';

const Details = () => {
  const detail = useSelector((state) => state.details)
  const dispatch = useDispatch()
  console.log(`company details : ${detail.companyDetails}   bill details : ${detail.billDetails}`)

return(
    <div className='w-[754px] h-[172.9px] flex justify-center'>

                    <div className='w-[377px] h-[172.9px] flex justify-center'>
                      <div className='w-[353px] h-[148.9px] mb-[24px] flex flex-col'>
                        <label className='mb-[11.2px]'>Your company details</label> {/*company details kısmı*/}
                        <textarea 
                        onChange={e => dispatch(company(e.target.value))}
                        className='border-black border-[1px] w-full h-full'></textarea> 
                      </div>  
                    </div>

                    <div className='w-[377px] h-[172.9px] flex justify-center'>
                      <div className='w-[353px] h-[148.9px] mb-[24px] flex flex-col'> {/*bill to kısmı*/}
                        <label className='mb-[11.2px]'>Bill to</label>
                        <textarea
                        onChange={e => dispatch(bill(e.target.value))}
                        className='border-black border-[1px] w-full h-full'></textarea> 
                      </div>  
                    </div>

                  </div>
)

}

export default Details