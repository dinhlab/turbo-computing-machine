import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Logo from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
function MainHeader () {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout(() => {
      navigate('/')
    })
  }
  const handleFavorite = () => {
    navigate('/favorite')
  }
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Logo />
          <Typography variant='h6' color='inherit' component='div'>
            Themoviedb
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated
            ? (
              <Typography variant='h6' color='inherit' component='div'>
                Welcome {user?.username}!
                <Button color='inherit' onClick={handleFavorite} sx={{ ml: 2 }}>
                  Favorite
                </Button>
                <Button color='inherit' onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </Typography>
              )
            : (
              <Button color='inherit' href='/login'>
                Login
              </Button>
              )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default MainHeader
