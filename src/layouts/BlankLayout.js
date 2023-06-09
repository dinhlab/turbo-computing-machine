import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import { Stack } from '@mui/material'
function BlankLayout () {
  return (
    <Stack minHeight='100vh' justifyContent='center' alignItems='center'>
      <header>
        <Logo sx={{ width: 70, height: 70 }} />
      </header>
      <Outlet />
    </Stack>
  )
}
export default BlankLayout
