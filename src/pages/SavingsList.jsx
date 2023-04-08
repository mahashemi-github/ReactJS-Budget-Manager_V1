import { useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContext'

const URL_S = 'http://localhost:8000/savings'

const SavingsList = () => {

    const { savingsList, setSavingsList,
            totalSavings, setTotalSavings
          } = useContext(DataContext)
    
    const deleteSaving = async (e, index, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL_S}/${id}` , { method: 'DELETE' })
            // const json = await response.json()  
            if(response.ok) {
                const newSavingsList = savingsList.filter(key => key !== savingsList[index])
                setSavingsList(newSavingsList)
                return console.log('Saving successfully deleted')
            }
        } catch(e) {
        throw new Error('There was a problem deleting the saving.')
        }
    }      

    useEffect(() => {
        let sum = 0
        savingsList.map((saving) => {
            return sum += parseInt(saving.amount)
        })
        setTotalSavings(sum)
        sum=0
    }, [savingsList])


    return ( 
        <div className="savings-list">
            <h2>Savings List</h2>
            <table>
                <thead>
                <tr>
                <th>Saving Name </th>
                <th>Saving Amount</th>
                <th></th>
                </tr>
                </thead>

                {savingsList.map((saving, index) => (
                <tbody key={index}>
                <tr>
                <td>{saving.name}</td>
                <td>{saving.amount}</td>
                <td>
                <button onClick={(e) => deleteSaving(e, index, saving.id)}>
                    <span className="material-symbols-outlined">Delete</span>
                </button>
                </td>
                </tr>
                </tbody>
                ))}

                <tbody>
                <tr className="total-amount">
                <td>Total Saving</td>
                <td>${totalSavings}</td>
                <td></td>
                </tr>
                </tbody>
            </table>  
        </div>
    )
}
 
export default SavingsList