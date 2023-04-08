import { createContext, useState } from 'react'

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {

  const [incomesList, setIncomesList] = useState([])
  const [savingsList, setSavingsList] = useState([])
  const [expensesList, setExpensesList] = useState([])

  const [totalIncomes, setTotalIncomes] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  const [msgSubmit, setMsgSubmit] = useState('')

  return (
    <DataContext.Provider value={{ 
      incomesList, setIncomesList,
      savingsList, setSavingsList,
      expensesList, setExpensesList,
      totalIncomes, setTotalIncomes,
      totalSavings, setTotalSavings,
      totalExpenses, setTotalExpenses,
      msgSubmit, setMsgSubmit
      }}>
      { children }
    </DataContext.Provider>
  )
}
