import { useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContext'

const URL_E = 'http://localhost:8000/expenses'

const ExpensesList = () => {

    const { expensesList, setExpensesList,
            totalExpenses, setTotalExpenses
          } = useContext(DataContext)
    
    const deleteExpense = async (e, index, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL_E}/${id}` , { method: 'DELETE' })
            // const json = await response.json()  
            if(response.ok) {
                const newExpensesList = expensesList.filter(key => key !== expensesList[index])
                setExpensesList(newExpensesList)
                return console.log('Expense successfully deleted')
            }
        } catch(e) {
        throw new Error('There was a problem deleting the expense.')
        }
    }      

    useEffect(() => {
        let sum = 0
        expensesList.map((expense) => {
            return sum += parseInt(expense.amount)
        })
        setTotalExpenses(sum)
        sum=0
    }, [expensesList])

    return ( 
        <div className="expenses-list">
            <h2>Expenses List</h2>
            <table>
                <thead>
                <tr>
                <th>Expense Name </th>
                <th>Expense Amount</th>
                <th></th>
                </tr>
                </thead>

                {expensesList.map((expense, index) => (
                <tbody key={index}>
                <tr>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>
                <button onClick={(e) => deleteExpense(e, index, expense.id)}>
                    <span className="material-symbols-outlined">Delete</span>
                </button>
                </td>
                </tr>
                </tbody>
                ))}

                <tbody>
                <tr className="total-amount">
                <td>Total Expense</td>
                <td>${totalExpenses}</td>
                <td></td>
                </tr>
                </tbody>
            </table>  
        </div>
    )
}
 
export default ExpensesList