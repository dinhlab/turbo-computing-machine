import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/LoadingScreen'
function AuthRequire ({ children }) {
  // Use the useAuth hook to get the isAuthenticated and isInitialized values from the AuthContext
  const { isAuthenticated, isInitialized } = useAuth()
  // Use the useLocation hook to get the current location object
  const location = useLocation()
  // If the AuthContext is not initialized yet, render the LoadingScreen component
  if (!isInitialized) {
    return <LoadingScreen />
  }
  // If the user is not authenticated, navigate to the login page with the current location object as state
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  // If the user is authenticated, render the children components
  return children
}
export default AuthRequire
