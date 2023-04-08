import { useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContext'

const URL_I = 'http://localhost:8000/incomes'

const IncomesList = () => {

    const { incomesList, setIncomesList,
            totalIncomes, setTotalIncomes
          } = useContext(DataContext)
    
    const deleteIncome = async (e, index, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL_I}/${id}` , { method: 'DELETE' })
            // const json = await response.json()  
            if(response.ok) {
                const newincomesList = incomesList.filter(key => key !== incomesList[index])
                setIncomesList(newincomesList)
                return console.log('Income successfully deleted')
            }
        } catch(e) {
        throw new Error('There was a problem deleting the income.')
        }
    }      

    useEffect(() => {
        let sum = 0
        incomesList.map((income) => {
            return sum += parseInt(income.amount)
        })
        setTotalIncomes(sum)
        sum=0
    }, [incomesList])

    return ( 
        <div className="incomes-list">
            <h2>Incomes List</h2>
            <table>
                <thead>
                <tr>
                <th>Income Source </th>
                <th>Income Amount</th>
                <th></th>
                </tr>
                </thead>

                {incomesList.map((income, index) => (
                <tbody key={index}>
                <tr>
                <td>{income.source}</td>
                <td>{income.amount}</td>
                <td>
                <button onClick={(e) => deleteIncome(e, index, income.id)}>
                    <span className="material-symbols-outlined">Delete</span>
                </button>
                </td>
                </tr>
                </tbody>
                ))}

                <tbody>
                <tr className="total-amount">
                <td>Total Income</td>
                <td>${totalIncomes}</td>
                <td></td>
                </tr>
                </tbody>
            </table>  
        </div>
    )
}
 
export default IncomesList