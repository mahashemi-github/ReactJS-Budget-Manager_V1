import { useContext, useRef, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { Form, useFetcher } from "react-router-dom"

const Incomes = () => {
  // const [incomeSource, setIncomeSource] = useState('')
  // const [incomeAmount, setIncomeAmount] = useState('')

  const { incomesList, setIncomesList,
          savingsList, setSavingsList,
          expensesList, setExpensesList
        } = useContext(DataContext)

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     const item = { incomeSource, incomeAmount }
  //     setIncomesList([...incomesList, item])
  //     setIncomeSource('')
  //     setIncomeAmount('')
  //     console.log(item)
  // }    

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return ( 
    <div className="incomes-form">
      <h2>Incomes Form</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <fetcher.Form method="post" ref={formRef}>
        <label>Income Source:</label>
        <input 
        type='text' 
        required 
        // value={incomeSource}
        // onChange={(e) => setIncomeSource(e.target.value)}
        name='incomeSource'
        placeholder="e.g. Web Project"
        ref={focusRef}
        autoComplete='off'
        />
        <label>Income Amount:</label>
        <input 
        type="number"
        // step="0.1"
        required 
        // value={incomeAmount}
        // onChange={(e) => setIncomeAmount(e.target.value)}
        name='incomeAmount'
        placeholder="e.g. 5500"
        autoComplete='off'
        />
        <input type="hidden" name="_action" value="registerIncome" />
        <button type="submit">
          <span className="material-symbols-outlined">Credit_Card</span>&nbsp; 
        Add to Incomes List</button>
      </fetcher.Form>    
      {/* </form> */}
    </div>
  )
}
 
export default Incomes