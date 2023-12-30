import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { invoiceNum, purchaseNum } from '../../redux/firstDivSlices/nameSlice';

const Name = () => {
  const name = useSelector((state) => state.name)
  const dispatch = useDispatch()
  console.log(`invoice number : ${name.invoiceNumber}  purchase order : ${name.purchaseOrder}`)
    return (

    <div className='w-[376.99px] h-[101.66px] flex justify-center'>
      
                      <div className='w-[188.48px] h-[101.66px] flex justify-center'> 
                        <div className='w-[164.48px] h-[77.66px] mb-[24px]'>
                          <label htmlFor="invoiceNumber" className=''>Invoice Number</label> {/* invoice number kısmı*/}
                          <input 
                          onChange={e => dispatch(invoiceNum(e.target.value))}
                          type="text" 
                          id="invoiceNumber" 
                          className='border-[1px] border-black w-[164.48px] h-[48px] mt-[10px]'>
                          </input> 
                        </div>
                      </div>


                      <div className='w-[188.48px] h-[101.66px] flex justify-center'>
                          <div className='w-[164.48px] h-[77.66px] mb-[24px]'>
                            <label htmlFor="purchaseOrder" className=''>Purchase Order</label> {/* purchase order kısmı*/}
                            <input
                              onChange={e => dispatch(purchaseNum(e.target.value))}
                             type="text" id="purchaseOrder" className='border-[1px] border-black w-[164.48px] h-[48px] mt-[10px]'></input>  
                          </div>
                      </div>

      </div>
    )  
};

export default Name