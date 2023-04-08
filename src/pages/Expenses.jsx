import { useState, useContext, useRef, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { Form, useFetcher } from "react-router-dom"

const Expenses = () => {
  // const [expenseName, setExpenseName] = useState('')
  // const [expenseAmount, setExpenseAmount] = useState('')
  
  const { totalIncomes, totalSavings, totalExpenses,
          msgSubmit, setMsgSubmit } = useContext(DataContext)
  const [checkExpenseAmount, setCheckExpenseAmount] = useState('')
  const [disables, setDisables] = useState(false)

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     const item = { expenseName, expenseAmount }
  //     setExpensesList([...expensesList, item])
  //     setExpenseName('')
  //     setExpenseAmount('')
  //     console.log(item)
  // }    

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  // const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      setCheckExpenseAmount('')
    }
  }, [isSubmitting])

  useEffect(() => {
    const remaining = totalIncomes - (totalSavings + parseFloat(checkExpenseAmount) + totalExpenses) 
    if (remaining < 0) {
      setDisables(true)
      setMsgSubmit(`The total income remaining cannot be ${ remaining }.`)
    } else {
      setDisables(false)
      setMsgSubmit(``)
    }
  }, [checkExpenseAmount, setCheckExpenseAmount])

return ( 
  <div className="expenses-form">
    <h2>Expenses Form</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <fetcher.Form method="post" ref={formRef}>
        <label>Expense Name:</label>
        <input 
        type='text' 
        required 
        // value={expenseName}
        // onChange={(e) => setExpenseName(e.target.value)}
        name='expenseName'
        placeholder="e.g. Gym"
        // ref={focusRef}
        autoComplete='off'
        />
        <label>Expense Amount:</label>
        <input 
        type='number' 
        required 
        value={checkExpenseAmount}
        onChange={(e) => setCheckExpenseAmount(e.target.value)}
        name='expenseAmount'
        placeholder="e.g. 600"
        autoComplete='off'
        />
        <input type="hidden" name="_action" value="registerExpense" />
        {disables ? <button type="submit" data-title={msgSubmit} disabled={disables}>
          <span className="material-symbols-outlined">Add_Card</span>&nbsp; 
          Add to Expenses List</button> :
          <button type="submit" disabled={disables}>
          <span className="material-symbols-outlined">Add_Card</span>&nbsp; 
          Add to Expenses List</button> }  
        </fetcher.Form>    
      {/* </form> */}
    </div> 
  )
}
 
export default Expenses