import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createDataFunc, deleteDataFunc, updateDataFunc, switchItems, defaultDataFunc, dynamicHeightFunc } from "../../redux/secondDivSlices/dataSlice";

const ExpenseForm = () => {

  const dispatch = useDispatch()
  const [height, setHeight] = useState(270.94);
  const [expenses, setExpenses] = useState([
    {
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
    dispatch(defaultDataFunc({ index: 0, expense: defaultExpense }));
    //dispatch(dynamicHeightFunc(height))  //==> burada ufak bi pürüz var gibi yarın bakıcam dinamik olarak parent div yüksekliğini 
    //ayarlamak için kullanıyorum
  }, []); 
  
  const handleButtonClick = () => {
    const newExpense = {
      description: "",
      cost: 0,
      quantity: 0,
      amount: 0,
    };
    setExpenses([...expenses, newExpense]);
    dispatch(createDataFunc({ index: expenses.length, expense: newExpense }));
    setHeight(height + 88.89)
    setHeight((prevHeight) => prevHeight + 88.89);
  };

 

  const handleInputChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
  const expenseToUpdate = { ...updatedExpenses[index] };

  if (field === "cost" || field === "quantity") {
    expenseToUpdate[field] = parseNumericInput(value);
  } else {
    expenseToUpdate[field] = value;
  }

  // cost ve quantity değerlerini çarp ve amount içine kaydet
  if (field === "cost" || field === "quantity") {
    const cost = expenseToUpdate.cost || 0;
    const quantity = expenseToUpdate.quantity || 0;
    expenseToUpdate.amount = cost * quantity;
  }

  updatedExpenses[index] = expenseToUpdate;

  setExpenses(updatedExpenses);

  // değişen öğeyi ve indeksi içeren nesneyi dispatch edin
  dispatch(updateDataFunc({ index, expense: expenseToUpdate }));
  };

  const parseNumericInput = (value) => {
    // sadece rakamları, virgülü ve noktayı kabul et
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

  const handleDeleteClick = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    dispatch(deleteDataFunc(index))
    if(height > 182.05){
      setHeight(height - 88.89)
      setHeight((prevHeight) => Math.max(182.05, prevHeight - 88.89));
    }
  };

  const itemsSwitch = (index) => {
     // not: gerekirse yerel durumu güncellemek isteyebilirsiniz.
  const updatedExpenses = [...expenses];
  if (index > 0 && index < updatedExpenses.length) {
    const temp = updatedExpenses[index - 1];
    updatedExpenses[index - 1] = { ...updatedExpenses[index] };
    updatedExpenses[index] = { ...temp };
    setExpenses(updatedExpenses); // yerel durumu güncelle
    dispatch(switchItems({ index }));
  } else {
    console.log('Geçersiz indeks.');
  }
  }


  return (
    <div className={`bg-[#16330014] w-full h-[${height}] mt-[16px] mb-[32px] flex flex-col items-center`}>   
      {expenses.map((expense, index) => (
        <div className={` w-full h-[${height}] mt-[16px] mb-[32px] flex flex-col items-center`}>
        <div className="w-[730px] h-[88.9px] -300 mr-[8px] ml-[8px] mt-[23px] mb-[15px]">
          <div className={`p-4 h-[${height}]`}>
        <div key={index} className="mb-4 p-2 flex justify-center">
          <input
            type="text"
            placeholder="Description"
            value={expense.description}
            onChange={(e) => handleInputChange(index, "description", e.target.value)}
            className="p-2 mb-2 mr-2 border w-[207.6px] h-[48px]"
          />
          <input
            type="text"
            placeholder="Cost"
            value={expense.cost}
            onChange={(e) => handleInputChange(index, "cost", parseNumericInput(e.target.value))}
            className="p-2 mb-2 mr-2 border w-[69.2px] h-[48px]"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={expense.quantity}
            onChange={(e) => handleInputChange(index, "quantity", parseNumericInput(e.target.value))}
            className="p-2 mb-2 mr-2 border w-[69.2px] h-[48px]"
          />
          <div className="bg-white w-[69.2px] h-[48px] flex items-center mr-[100px]"><p className="ml-[10px]">{expense.amount}</p></div>
          <button onClick={() => handleDeleteClick(index)} className="p-2 bg-red-500 text-white">
            Delete
          </button>
          <button 
          onClick={() => itemsSwitch(index)}
          className="p-2 bg-green-500 text-white ml-[30px]">
            Up
          </button>
        </div>
        </div>
    </div>                
    </div>
      ))}
      <button onClick={handleButtonClick} className="p-2 bg-blue-500 text-white">
        Add Expense
      </button>
    </div>
 
  );
};

export default ExpenseForm;