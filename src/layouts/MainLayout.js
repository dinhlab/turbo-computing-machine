import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'
function MainLayout () {
  // Render the main layout of the app, which includes a header,
  // a container for child components, and a footer.
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      {/* Render the main header */}
      <MainHeader />
      {/* Render child route components defined in Router */}
      <Outlet />
      {/* Fill up the remaining space */}
      <Box sx={{ flexGrow: 1 }} />
      {/* Render the main footer */}
      <MainFooter />
    </Stack>
  )
}
export default MainLayout
