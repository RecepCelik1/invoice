import React, {  } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FirstDiv from './components/firstDiv/firstDIV.jsx';
import ThirdDiv from './components/thirthDiv/thirdDIV.jsx';
import FourthDiv from './components/generatingPDF/fourthDiv.jsx';
import { useSelector } from 'react-redux';
import ExpenseForm from './components/secondDiv/expenseForm.jsx';

function App() {

  const height = useSelector(state => state.dataStore.dynamicHeight)
  const h1 = 1060.17 
  //const h2 = 1044.17  // burayı contentin yükeskliğini dinamik hale getirmek için yazdım ama bu konuda ufak tefek pürüzler var 
                      // olması gerektiği gibi çalışmıyor düzelttikten editlerim

  /*
  * FirstDiv : invoice number , purchase order, logo yükleme kısmı, company details , bill to currency, invoice date ve due date
  kısımlarını içeriyor. componetler içerisindeki first div kısmında bulunuyor. oradaki bütün yapılar secondDIV adındaki başka bir
  componente aktarılıp sonra buraya aktarıldı. app.js' te kod kalabalığı olmaması için
  */


  /*
  * ExpenseForm : expense kısmına ürün eklediğim bölüm bulunuyor sadece. bu kısım dinamik yüksekliğe sahip. components içerisinde 
    secondDiv klasorü içerisinde tutuluyor. düzen bozulmasın diye secondDIV e aktarılıp, buraya çekildi
  */


  /*
  * ThirDiv : notes, bank account details , subtotal , tax , discount , shipping fee ve total kısımlarını içeriyor. componetler içerisindeki thirthDiv klasöründe tutuluyor. oradaki bütün yapılar thirthDIV adındaki başka bir componente aktarılıp sonra buraya aktarıldı. app.js' te kod kalabalığı olmaması için
  */


  /*
  * FourthDiv : sadece Create the invoice butonunu içeriyor. doğrudan componensler içerisinde  tutuluyor.
  */


  return (
      <div className='flex flex-col items-center bg-[#282c34]'>
        <div className={`relative w-[858px] h-[${h1 + height}] flex flex-col items-center rounded-[30px] shadow-2xl mt-[150px] mb-[200px]`}>
          <div className={`absolute top-0 left-0 w-full h-[${h1 + height}] bg-cover bg-center rounded-[31.5px] bg-[#f97316]`}></div>
          <div className={`relative w-full h-[${h1 + height}]  rounded-[30px] flex items-center justify-center bg-[#61dafb]`}>
            <div className={`bg-white w-[793.99px] flex flex-col items-center`}>
        
                <FirstDiv />
                <ExpenseForm />
                <ThirdDiv />
                <FourthDiv />

            </div>

        </div>
      </div>
    </div>
    
  );
}

export default App;
