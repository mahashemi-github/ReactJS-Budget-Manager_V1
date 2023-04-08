import { useState, useContext, useRef, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { Form, useFetcher } from "react-router-dom"

const Savings = () => {
    // const [savingName, setSavingName] = useState('')
    // const [savingAmount, setSavingAmount] = useState('')

    const { totalIncomes, totalSavings, totalExpenses,
            msgSubmit, setMsgSubmit } = useContext(DataContext)

    // const remaining = totalIncomes - (totalSavings + totalExpenses) 
    const [checkSavingAmount, setCheckSavingAmount] = useState('')
    const [disables, setDisables] = useState(false)


    // useEffect(() => {
    //   (remaining < 0 ) ? setMsgSubmit(`The total income remaining is ${ remaining }.`) : setMsgSubmit('')
    // }, [setMsgSubmit, remaining])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const item = { savingName, savingAmount }
    //     setSavingsList([...savingsList, item])
    //     setSavingName('')
    //     setSavingAmount('')
    //     console.log(item)
    // }    

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"
  
    const formRef = useRef();
    // const focusRef = useRef();
  
    useEffect(() => {
      if (!isSubmitting) {
        formRef.current.reset()
        setCheckSavingAmount('')
      }
    }, [isSubmitting])

    useEffect(() => {
      const remaining = totalIncomes - (totalSavings + parseFloat(checkSavingAmount) + totalExpenses) 
      if (remaining < 0) {
        setDisables(true)
        setMsgSubmit(`The total income remaining cannot be ${ remaining }.`)
      } else {
        setDisables(false)
        setMsgSubmit(``)
      }
    }, [checkSavingAmount, setCheckSavingAmount])

    return ( 
        <div className="savings-form">
            <h2>Savings Form</h2>
            {/* <form onSubmit={handleSubmit}> */}
            <fetcher.Form method="post" ref={formRef}>
            <label>Saving Name:</label>
                <input 
                type='text' 
                required 
                // value={savingName}
                // onChange={(e) => setSavingName(e.target.value)}
                name='savingName'
                placeholder="e.g. Bank Account"
                // ref={focusRef}
                autoComplete='off'
                />
                <label>Saving Amount:</label>
                <input 
                type='number' 
                required 
                value={checkSavingAmount}
                onChange={(e) => setCheckSavingAmount(e.target.value)}
                name='savingAmount'
                placeholder="e.g. 5000"
                autoComplete='off'
                />
                <input type="hidden" name="_action" value="registerSaving" />

                {disables ? <button type="submit" data-title={msgSubmit} disabled={disables}>
                  <span className="material-symbols-outlined">Add_Card</span>&nbsp; 
                  Add to Savings List</button> :
                  <button type="submit" disabled={disables}>
                  <span className="material-symbols-outlined">Add_Card</span>&nbsp; 
                  Add to Savings List</button> }
            </fetcher.Form>    
            {/* </form> */}
        </div> 
    )
}
 
export default Savings