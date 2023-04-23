import { createContext, useReducer, useEffect, useContext } from 'react'
// Set initial state of the authentication context
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}
// Define action types for the reducer
const INITIALIZE = 'INITIALIZE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload
      // Update state with the authentication information from the action
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user
      }
    case LOGIN_SUCCESS:
      // Update state to reflect a successful login
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case LOGOUT:
      // Update state to reflect a logout
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}
// Create the authentication context
const AuthContext = createContext({ ...initialState })
// Create the authentication provider component
function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  // Perform initialization when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        // Get the username from local storage
        const username = window.localStorage.getItem('username')
        if (username) {
          // If the username exists, set the authentication state accordingly
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { username } }
          })
        } else {
          // If the username does not exist, set the authentication state accordingly
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null }
          })
        }
      } catch (err) {
        // If there is an error, set the authentication state accordingly
        console.error(err)
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }
    initialize()
  }, [])
  // Define the login function
  const login = async (username, callback) => {
    // Save the username to local storage
    window.localStorage.setItem('username', username)
    // Update state to reflect a successful login
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username } }
    })
    // Call the callback function
    callback()
  }
  // Define the logout function
  const logout = async callback => {
    // Remove the username from local storage
    window.localStorage.removeItem('username')
    // Update state to reflect a logout
    dispatch({ type: LOGOUT })
    // Call the callback function
    callback()
  }
  // Return the authentication provider component with the authentication context and state as its value
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// Export the authentication context and provider
export { AuthContext, AuthProvider }
// Create a custom hook for accessing the authentication context
export const useAuth = () => {
  return useContext(AuthContext)
}
