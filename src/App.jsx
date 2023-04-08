import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages import
// import Incomes from './pages/Incomes'
// import Savings from './pages/Savings'
// import Expenses from './pages/Expenses'
import NotFound from './pages/NotFound'

// layouts import
import RootLayout from './layouts/RootLayout'
import BudgetManagerLayout from './layouts/BudgetManagerLayout'
import { BudgetManagerAction, BudgetManagerLoader } from './layouts/BudgetManagerLayout'
import ErrorHandler from './pages/ErrorHandler'

const router = createBrowserRouter(
  createRoutesFromElements(        
    <Route path='/' element={<RootLayout />}>
      <Route 
      path='/' 
      element={<BudgetManagerLayout /> }
      loader={BudgetManagerLoader}
      action={BudgetManagerAction}
      errorElement={<ErrorHandler />}
      />
        {/* <Route path='incomeform' element={<Incomes />} />
        <Route path='incomeform' element={<Savings />} />
        <Route path='incomeform' element={<Expenses />} /> */}
      {/* </Route> */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
