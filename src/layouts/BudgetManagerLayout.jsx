import {  redirect, useLoaderData  } from 'react-router-dom'
import Incomes from '../pages/Incomes'
import Savings from '../pages/Savings'
import Expenses from '../pages/Expenses'
import IncomesList from '../pages/IncomesList'
import ExpensesList from '../pages/ExpensesList'
import SavingsList from '../pages/SavingsList'
import ChartElement from '../pages/ChartElement'
import ChartElementExpenses from '../pages/ChartElementExpenses'
import { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import LimitAnnouncer from '../pages/LimitAnnouncer'

const BudgetManagerLayout = () => {
  const { incomes, expenses, savings} = useLoaderData()

  const { incomesList, setIncomesList,
          savingsList, setSavingsList,
          expensesList, setExpensesList
        } = useContext(DataContext)

  useEffect(() => {
    if(incomes) {
      setIncomesList(incomes)
    }
    if(expenses) {
      setExpensesList(expenses)
    }
    if(savings) {
      setSavingsList(savings)
    }
  }, [incomes, expenses, savings])

  return ( 
    <>
      <LimitAnnouncer />

      <div className="budget-manager-layout">
        <div className="incomes">
          <Incomes />
          <IncomesList />
        </div>
        <div className="expenses">
          <Expenses />
          <ExpensesList />
        </div>
        <div className="savings">
          <Savings />
          <SavingsList />
        </div>
      </div>
      <ChartElement />
      <ChartElementExpenses />
    </>
  )
}

//------------------------------------------------------------
const URL_I = 'http://localhost:8000/incomes'
const URL_E = 'http://localhost:8000/expenses'
const URL_S = 'http://localhost:8000/savings'

//-- Loaders -------------------------------------------------
export const BudgetManagerLoader = async () => {
  let getIncomes = ''
  let getExpenses = ''
  let getSavings = ''

  try {
    const response1 = await fetch(URL_I)
    const json1 = await response1.json()  

    if(response1.ok) {
      getIncomes = json1
    }

    const response2 = await fetch(URL_E)
    const json2 = await response2.json()  
    if(response2.ok) {
      getExpenses = json2
    }

    const response3 = await fetch(URL_S)
    const json3 = await response3.json()  
    if(response3.ok) {
      getSavings = json3
      return { incomes: getIncomes, expenses: getExpenses, savings: getSavings}
    } 
  } catch(err) {
    if(err.message === 'Failed to fetch') {
      throw new Error('There was a problem loading data from the database.');
    }
    throw new Error('There was a problem loading data from the database.');
  }
}

//-- Actions -------------------------------------------------
export const BudgetManagerAction = async ({ request }) => {
  // await new Promise((res) => setTimeout(res, Math.random() * 800))
  
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data)

  // Add a New Income
  if (_action === 'registerIncome') {
    // console.log(values.incomeAmount, values.incomeSource, 'llllllll')
    const doc = { source: values.incomeSource, amount: values.incomeAmount }
    try {
      const response = await fetch(URL_I, {
                                            method: 'POST',
                                            body: JSON.stringify(doc),
                                            headers: { 'Content-Type': 'application/json' }
                                          })
      const json = await response.json()  
      if(response.ok) {
        console.log('Income successfully added')
      }
      return redirect('/')
    } catch(e) {
      throw new Error('There was a problem adding income to the database.');
    }
  }

  //---------------------------------------------------
  if (_action === 'registerExpense') {
    // console.log(values.expenseAmount, values.expenseName, 'llllllll')
    const doc = { name: values.expenseName, amount: values.expenseAmount }
    try {
      const response = await fetch(URL_E, {
                                            method: 'POST',
                                            body: JSON.stringify(doc),
                                            headers: { 'Content-Type': 'application/json' }
                                          })
      const json = await response.json()  
      if(response.ok) {
        console.log('Expense successfully added')
      }
      return redirect('/')
    } catch(e) {
      throw new Error('There was a problem adding expense to the database.');
    }
  }

  //---------------------------------------------------
  if (_action === 'registerSaving') {
    // console.log(values.savingAmount, values.savingName, 'llllllll')
    const doc = { name: values.savingName, amount: values.savingAmount }
    try {
      const response = await fetch(URL_S, {
                                            method: 'POST',
                                            body: JSON.stringify(doc),
                                            headers: { 'Content-Type': 'application/json' }
                                          })
      const json = await response.json()  
      if(response.ok) {
        console.log('Saving successfully added')
      }
      return redirect('/')
    } catch(e) {
      throw new Error('There was a problem adding saving to the database.');
    }
  }

}
 
export default BudgetManagerLayout