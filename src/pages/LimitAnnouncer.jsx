import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const LimitAnnouncer = () => {
    const { totalIncomes, totalSavings, totalExpenses } = useContext(DataContext)
    const remaining = totalIncomes - (totalSavings + totalExpenses)

    return ( 
        <div className="limit-announcer-card">
            <span><span className="material-symbols-outlined">Info</span> Note:</span><br />
            <span>Total Income = Total Saving + Total Expense </span><br />
            <span>The sum of the Total Saving and the Total Expense should not exceed the Total Income. </span><br />
            <span style={{color: '#bc4123', fontWeight: 'bold'}}>The total income remaining is ${ remaining }. </span>
        </div>
     )
}
 
export default LimitAnnouncer