import Calender from "./calenders"
import CurrencyDropdown from "./currencyDropdown"
import Details from "./details"
import Name from "./name"
import Uploader from "./uploader"

const FirstDiv = () => {
return (
    <div className="w-full h-[407.4px] flex flex-col items-center">
        <div className='w-[754.01px] h-[134.96px] flex justify-center'>
            <Name />
            <Uploader /> 
                </div>
                  <Details/>
                    <div className='w-[754.01px] h-[102.88px] flex justify-center'>
                      <CurrencyDropdown /> 
                      <Calender/>
                    </div>
    </div>
)

}

export default FirstDiv