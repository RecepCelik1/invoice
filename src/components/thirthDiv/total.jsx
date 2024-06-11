import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { taxFunc, discountFunc, shippingFunc } from "../../redux/thirdDivSlices/totalSlice";

const Total = () => {

    const sumOfAmounts = useSelector(state => state.dataStore.sumOfamounts)
    const dispatch = useDispatch()
    const total = useSelector (state => state.total)

    const lastTotal = (sumOfAmounts + ((sumOfAmounts - total.discount) * (total.tax/100))) + (total.shipping - total.discount) //=> aritmetik işlemler
    const currency = useSelector(state => state.currency.currency) //=> para birimi

    const parseNumericInput = (value) => { //=> parsing işlemleri
      //=> sadece rakamları, virgülü ve noktayı kabul et
      const parsedValue = value.replace(/[^0-9.]/g, '');
  
      //=> birden fazla nokta varsa sadece ilkini kullan
      const dotIndex = parsedValue.indexOf('.');
      if (dotIndex !== -1) {
        const beforeDot = parsedValue.substring(0, dotIndex);
        const afterDot = parsedValue.substring(dotIndex + 1);
        return beforeDot + '.' + afterDot.replace(/[.,]/g, ''); //=> nokta veya virgülü temizle
      }
  
      return parsedValue;
    };

    const formatNumberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className='w-[377px] h-[full]'>
          <div className='w-full h-[292px] flex flex-col'>

            <div className='w-[377px] h-[26px] mb-[24px] flex justify-between '>
              <div className='w-[125.67px] h-[26px] ml-[8px]'>Subtotal</div>
              <div className='w-[251.33px] h-[26px] flex justify-end mr-[12px]'>{currency} {isNaN(sumOfAmounts) ? 0 : formatNumberWithCommas(sumOfAmounts.toFixed(2))}
              </div>
            </div>           

            <div className='w-[377px] h-[48px] mb-[24px] flex'>
              <label className='w-[118.67px] h-[10px] ml-[8px] mt-[10px]'>Tax %</label>
                <div className='w-[251.33px] h-[48px] flex justify-center'>
                  <div className='w-[227.33px] h-[48px] flex justify-between relative'>
                      <div className='absolute right-2 bottom-4'>%</div>
                          <input className='w-[227.33px] h-[45px] border-black border-[1px]'
                                 onChange={e => dispatch(taxFunc(parseNumericInput(e.target.value)))}>
                          </input>
                  </div>
                </div>
              </div>            

              <div className='w-[377px] h-[48px] mb-[24px] flex'>
                <label className='w-[118.67px] h-[10px] ml-[8px] mt-[10px]'>Discount {currency}</label>
                  <div className='w-[251.33px] h-[48px] flex justify-center'>
                    <div className='w-[227.33px] h-[48px] flex justify-between relative'>
                        <div className='absolute right-2 bottom-4'></div>
                        <input className='w-[227.33px] h-[45px] border-black border-[1px]'
                               onChange={e => dispatch(discountFunc(parseNumericInput(e.target.value)))}>
                        </input>
                    </div>
                  </div>
              </div>

              <div className='w-[377px] h-[48px] mb-[24px] flex'>
                <label className='w-[118.67px] h-[10px] ml-[8px] mt-[10px]'>Shipping fee</label>
                  <div className='w-[251.33px] h-[48px] flex justify-center'>
                    <div className='w-[227.33px] h-[48px] flex justify-between relative'>
                      <div className='absolute right-2 bottom-4'></div>
                        <input className='w-[227.33px] h-[45px] border-black border-[1px]'
                               onChange={e => dispatch(shippingFunc(parseNumericInput(e.target.value)))}>                         
                        </input>
                    </div>
                  </div>
              </div>
                        
              <div className='w-[377px] h-[26px] flex justify-center'>
                <div className='h-full w-[117.67px] ml-[8px]'>Total</div>
                  <div className='h-full w-[251.33px] flex justify-end mr-[12px]'>{currency} {isNaN(lastTotal) ? 0 : formatNumberWithCommas(lastTotal.toFixed(2))}</div>
              </div>

          </div>
        </div>
    )
}

export default Total