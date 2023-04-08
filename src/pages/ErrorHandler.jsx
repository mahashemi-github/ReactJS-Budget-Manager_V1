import { useRouteError } from 'react-router-dom'

const ErrorHandler = () => {
  const error = useRouteError()

  if(error.message.includes('Unexpected token')) {
    error.message = 'Something went wrong! Failed to fetch.'
  }

  if(error.message === 'Failed to fetch') {
    error.message = 'Something went wrong! Failed to fetch.'
  }

  return (
    <div className="error-handler">
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  )
}
 
export default ErrorHandler