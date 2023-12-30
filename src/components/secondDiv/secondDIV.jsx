import React from "react"; 
import ExpenseForm from "./dynamicDiv";
import { useSelector } from "react-redux";

const SecondDiv = () => {
  const amountValue = useSelector(state => state.dataStore.sumOfamounts)
  console.log('sum of amounts is = ', amountValue)

  return (
    
    <ExpenseForm />
                    
  )
} 

export default SecondDiv