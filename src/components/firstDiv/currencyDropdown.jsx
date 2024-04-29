
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux'
import { Currency } from '../../redux/firstDivSlices/currencySlice';


const CurrencyDropdown = () => {

    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const dispatch = useDispatch()

    //=> ülkelerin listesi
    const countries = [
      { value: 'USD', label: 'US dollar', flag: '🇺🇸' },
      { value: '€', label: 'Euro', flag: '🇪🇺' },
      { value: '£', label: 'GBP', flag: 'UK' },
      //=> diğer ülkeleri ekleyin
    ];
  
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid #ccc',
        color: state.isSelected ? 'white' : 'black',
        background: state.isSelected ? '#007BFF' : state.isFocused ? '#16330014' : 'white',
        padding: 10,
      }),
      control: (provided) => ({
        ...provided,
        width: '100%',
        height: '48px',
        border: '1px solid black',
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '10px',
      }),
    };
  
    useEffect(() => {
      //=> seçili para biriminin default değerini ABD Doları olarak ayarlıyoruz
      setSelectedCurrency(countries[0]);
      
      //=> redux store'daki currency'yi güncelliyoruz
      dispatch(Currency(countries[0].value));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
      <div className='w-[377.005px] h-[102.88px] flex flex-col items-center'>

          <div className='w-[353.1px] h-[78.88px] mb-[24px] flex flex-col'> {/*=> currency seçme kısmı */}
              <label htmlFor='currency'>Currency</label>
                  <div className='w-[353.01px] h-[48px] mt-[9.19px]'></div>
                      <Select   
                        options={countries}
                        styles={customStyles}
                        value={selectedCurrency}
                        onChange={(selectedOption) => {
                        setSelectedCurrency(selectedOption);
                        dispatch(Currency(selectedOption.value));}}
                        placeholder="Select currency..."
                        isSearchable     
                      />  {/*=> seçme işlemleri için react select kütüphanesi kullanıldı*/}
                    </div>

      </div>
      
    );
  };

  export default CurrencyDropdown