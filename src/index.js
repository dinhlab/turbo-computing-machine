// Import the StrictMode component from React, and the createRoot function from react-dom/client
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import the App component from the App.js file
import App from './App'
// Get the root element from the DOM
const rootElement = document.getElementById('root')
// Create a root using the createRoot function with the rootElement as its argument
const root = createRoot(rootElement)
// Render the App component inside a StrictMode component using the render method of the root
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
