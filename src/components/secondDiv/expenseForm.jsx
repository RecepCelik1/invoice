import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createDataFunc, deleteDataFunc, updateDataFunc, switchItems, defaultDataFunc } from "../../redux/secondDivSlices/dataSlice";

const ExpenseForm = () => {

  const dispatch = useDispatch()
  const [height, setHeight] = useState(270.94); //=> contentin bulunduğu kutunun yüksekliğini intekraktif hale getirmek için tanımlandı
                                                //aşağıda yeni kutu oluşturmak veya silmek için kullanılan fonksiyonlar tetiklendiğinde
                                                //oluşan kutu boyutu kadar height değişkeni artıyor ve daha sonra content height 
                                                //olarak kullanılıyor

  const [expenses, setExpenses] = useState([    //=> her yeni div oluştuğunda dive karşılık bir object oluşuyor. objedeki değişkenler 
    {                                           //divdeki inputlara karşılıklı. oluşan obje expenses içerisinde saklanıyor
      description: "",
      cost: 0,
      quantity: 0,
      amount: 0,
    },
  ]);
 

  useEffect(() => {
    const defaultExpense = {
      description: "",
      cost: 0,
      quantity: 0,
      amount: 0,
    };
    dispatch(defaultDataFunc({ index: 0, description: defaultExpense.description, cost : defaultExpense.cost, quantity : defaultExpense.quantity, amount : defaultExpense.amount }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //=> array boş bırakılarak sadece ilk renderda tetiklenmesi sağlanıypr
  
  const handleButtonClick = () => { //=> yeni div oluşturulduğunda tetiklenen fonksiyon
    const newExpense = {
      description: "",
      cost: 0,
      quantity: 0,
      amount: 0,
    };
    setExpenses([...expenses, newExpense]); //=> oluşan obje expense içerisine pushlanıyor
    dispatch(createDataFunc({ index: expenses.length, description: newExpense.description, cost : newExpense.cost, quantity : newExpense.quantity, amount : newExpense.amount })); //=> güncel expenses dispatch ediliyor
    
    setHeight(height + 88.89) //=> dinamik yükseklik
    setHeight((prevHeight) => prevHeight + 88.89);
  };

 

  const handleInputChange = (index, field, value) => { //=> inputlarda değilik olduğunda tetiklenen fonksiyon

    const updatedExpenses = [...expenses];  //=> expenses'taki objeleri klonla
  const expenseToUpdate = { ...updatedExpenses[index] }; //=> index numarasından update edilecek objeyi çek

  if (field === "cost" || field === "quantity") {     //=> numeric bir inputta değişilik yapıldıysa gerekli parsing işlemleri için 
    expenseToUpdate[field] = parseNumericInput(value);  //tanımlanmış fonksiyona gönder value'yi
  } else {
    expenseToUpdate[field] = value; //=> numeric olmayan inputta yapılan değişikliği direk expenseToUpdate içerisinde güncelle
  }

  //=> cost ve quantity değerlerini çarp ve amount içine kaydet. amount ilgili dive ait objede tutulur.
  if (field === "cost" || field === "quantity") {
    const cost = expenseToUpdate.cost || 0;
    const quantity = expenseToUpdate.quantity || 0;
    expenseToUpdate.amount = cost * quantity;
  }

  updatedExpenses[index] = expenseToUpdate; //=> gerekli datalar update edildikten sonra, klonladığımız updatedExpenses'a pushlanır
                                            // ve nihai güncel expenses artık updated expenses içerisindedir
  setExpenses(updatedExpenses); //=> asıl depo expenses update edilir

  // değişen öğeyi ve indeksi içeren nesneyi dispatch edin
  dispatch(updateDataFunc({ index, expense: expenseToUpdate }));  //=> en güncel expenses dispatch edilir
  };

  const parseNumericInput = (value) => { //=> parsing ve filtreleme işlemleri
    //=> sadece rakamları, virgülü ve noktayı kabul et

    const parsedValue = value.replace(/[^0-9.]/g, '');

    // birden fazla nokta varsa sadece ilkini kullan
    const dotIndex = parsedValue.indexOf('.');
    if (dotIndex !== -1) {
      const beforeDot = parsedValue.substring(0, dotIndex);
      const afterDot = parsedValue.substring(dotIndex + 1);
      return beforeDot + '.' + afterDot.replace(/[.,]/g, ''); // nokta veya virgülü temizle
    }

    return parsedValue;
  };

  const handleDeleteClick = (index) => { //=> ilgili dive ait obje index numarasını üzerinden bulunup silinir
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    dispatch(deleteDataFunc(index))

    if(height > 182.05){  //=> ne olur ne olmaz birisi bi şekilde buga sokup content yüksekliğini sıfıra indirmesin diye
      setHeight(height - 88.89)
      setHeight((prevHeight) => Math.max(182.05, prevHeight - 88.89));
    }
  };

  const itemsSwitch = (index) => {
     //=> not: gerekirse yerel durumu güncellemek isteyebilirsiniz.
  const updatedExpenses = [...expenses];
  if (index > 0 && index < updatedExpenses.length) {

    const temp = updatedExpenses[index - 1]; //=> kendisinden önceki indexte bulunan değeri geçici olarak temp'te tut
    updatedExpenses[index - 1] = { ...updatedExpenses[index] }; //=> kendisinden önceki indexe pushla
    updatedExpenses[index] = { ...temp }; //=> tempi istek yapılan indexe pushla
    setExpenses(updatedExpenses); //=> yerel durumu güncelle
    dispatch(switchItems({ index })); //=> ilgili stateye dispatch et

  } else {
    console.log('Geçersiz indeks.');
  }
  }


  return (

<div className={`bg-[#16330014] w-full h-[${height}] mt-[16px] mb-[32px] flex flex-col items-center`}>

   {expenses.map((expense, index) => ( //=> expense içerisinde bulunan dataları aşağıdaki gibi mapla
    <div key={index} className={` w-full h-[${height}] mt-[16px] mb-[32px] flex flex-col items-center`}>
      <div className="w-[730px] h-[88.9px] -300 mr-[8px] ml-[8px] mt-[23px] mb-[15px]">
        <div className={`p-4 h-[${height}]`}>
          <div key={index} className="mb-4 p-2 flex justify-center">

              <input  //=> ilk input alanı içerisine girilen value, geçerli index numarasını ve hangi alandan gönderildiğini 
              type="text" //=> handleInputChange'e yolla
              placeholder="Description"
              value={expense.description} 
              onChange={(e) => handleInputChange(index, "description", e.target.value)}
              className="p-2 mb-2 mr-2 border w-[207.6px] h-[48px]"
              />

              <input //=> ikinci input
                type="text"
                placeholder="Cost"
                value={expense.cost}
                onChange={(e) => handleInputChange(index, "cost", parseNumericInput(e.target.value))}
                className="p-2 mb-2 mr-2 border w-[69.2px] h-[48px]"
              />

              <input //=> 3. input
                type="text"
                placeholder="Quantity"
                value={expense.quantity}
                onChange={(e) => handleInputChange(index, "quantity", parseNumericInput(e.target.value))}
                className="p-2 mb-2 mr-2 border w-[69.2px] h-[48px]"
              />

              <div className="bg-white w-[69.2px] h-[48px] flex items-center mr-[100px]">
                <p className="ml-[10px]">{expense.amount}</p>
              </div>

              <button //=> silme butonu
              onClick={() => handleDeleteClick(index)} className="p-2 bg-red-500 text-white">
                Delete
              </button>

              <button //=> switch butonu
              onClick={() => itemsSwitch(index)}
              className="p-2 bg-green-500 text-white ml-[30px]">
                Up
              </button>
          </div>
        </div>
      </div>                
    </div>))}

      <button onClick={handleButtonClick} className="p-2 bg-blue-500 text-white">
        Add Expense
      </button>
    </div>
 
  );
};

export default ExpenseForm;