import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return ( 
    <div className="root-layout">
      <header> 
        <h2>Budget Manager</h2>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
 
export default RootLayout