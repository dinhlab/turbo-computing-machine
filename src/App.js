import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import { AuthProvider } from './contexts/AuthContext'
import ThemeProvider from './contexts/ThemeProvider'
function App () {
  return (
    // Wrap the Router component inside the AuthProvider component
    // The AuthProvider component is responsible for managing the user authentication state and providing it to other components
    <AuthProvider>
      {/* Wrap the BrowserRouter component around the ThemeProvider and Router components */}
      {/* The BrowserRouter component is responsible for providing the routing functionality to the application */}
      <BrowserRouter>
        {/* Wrap the Router component inside the ThemeProvider component */}
        {/* The ThemeProvider component is responsible for managing the current theme of the application */}
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
