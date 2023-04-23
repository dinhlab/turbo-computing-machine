import { useState, useEffect } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import apiService from '../app/apiService'
import { API_KEY } from '../app/config'
function ProductFilter ({ onGenreClick }) {
  const [genres, setGenres] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  useEffect(() => {
    const getGenres = async () => {
      const response = await apiService.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
      setGenres(response.data.genres)
    }
    getGenres()
  }, [])
  const genreOptions = ['All', ...genres.map((genre) => genre.name)]
  const isSmallerScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  )
  useEffect(() => {
    setIsFilterVisible(!isSmallerScreen)
  }, [isSmallerScreen])
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }
  return (
    <>
      {isSmallerScreen && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1, mr: 2 }}>
          <IconButton
            size='large'
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            {genreOptions.map((genre) => (
              <MenuItem
                key={genre}
                onClick={() => {
                  handleMenuClose()
                  onGenreClick(genre)
                }}
              >
                {genre}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
      <Box
        sx={{
          width: 200,
          display: isFilterVisible || !isSmallerScreen ? 'block' : 'none'
        }}
      >
        {!isSmallerScreen && (
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Genres
          </Typography>
        )}
        <List>
          {genreOptions.map((genre) => (
            <ListItem
              key={genre}
              disablePadding
              onClick={() => {
                if (isSmallerScreen) {
                  handleMenuClose()
                  onGenreClick(genre)
                } else {
                  onGenreClick(genre)
                }
              }}
            >
              <ListItemButton>
                <ListItemText primary={genre} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
export default ProductFilter
