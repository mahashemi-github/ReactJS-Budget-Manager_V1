import { Link } from 'react-router-dom'

const NotFound = () => {
  return ( 
    <div className='not-found'>
      <h2>Page Not Found!</h2>
      <p>Go to <Link to="/">Budget Manager</Link>.</p>
    </div>
  )
}
 
export default NotFound