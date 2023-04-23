import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { API_KEY, BASE_URL, IMAGE_URL } from '../app/config'
import apiService from '../app/apiService'
import LoadingScreen from '../components/LoadingScreen'
import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  IconButton
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
function DetailPage () {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  // useEffect to check if movie is already favorited
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {}
    setIsFavorite(storedFavorites[movie?.id] !== undefined)
  }, [movie?.id])
  // useEffect to listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || {}
      setIsFavorite(storedFavorites[movie?.id] !== undefined)
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [movie?.id])
  useEffect(() => {
    const getMovie = async () => {
      setLoading(true)
      try {
        const res = await apiService.get(
          `${BASE_URL}movie/${params.id}?api_key=${API_KEY}`
        )
        setMovie(res.data)
        setError('')
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
      setLoading(false)
    }
    if (params.id) {
      getMovie()
    }
  }, [params])
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev)
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {}
    if (isFavorite) {
      delete storedFavorites[movie.id]
    } else {
      storedFavorites[movie.id] = movie
    }
    localStorage.setItem('favorites', JSON.stringify(storedFavorites))
  }
  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 4 }}>
        <Link underline='hover' color='inherit' component={RouterLink} to='/'>
          Home
        </Link>
        <Typography color='text.primary'>{movie?.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: 'relative', height: 1 }}>
        {loading
          ? (
            <LoadingScreen />
            )
          : (
            <>
              {error
                ? (
                  <Alert severity='error'>{error}</Alert>
                  )
                : (
                  <>
                    {movie
                      ? (
                        <Card>
                          <Grid container>
                            <Grid item xs={12} md={6}>
                              <Box p={2}>
                                <Box
                                  sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    display: 'flex'
                                  }}
                                >
                                  <Box
                                    component='img'
                                    sx={{
                                      width: 1,
                                      height: 1
                                    }}
                                    src={`${IMAGE_URL}/${movie.backdrop_path}`}
                                    alt={movie.title}
                                  />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack direction='row' alignItems='center'>
                                <Typography variant='h5' mb={0} paragraph>
                                  {movie.title}
                                </Typography>
                                <IconButton
                                  onClick={handleFavoriteClick}
                                  aria-label='add to favorites'
                                >
                                  <Favorite
                                    color={isFavorite ? 'secondary' : 'inherit'}
                                  />
                                </IconButton>
                              </Stack>
                              <Typography variant='subtitle1' sx={{ mb: 2 }}>
                                Genres:{' '}
                                {movie.genres.map((genre) => genre.name).join(', ')}
                              </Typography>
                              <Typography variant='subtitle1' sx={{ mb: 2 }}>
                                Release Date: {movie.release_date}
                              </Typography>
                              <Divider sx={{ borderStyle: 'dashed' }} />
                              <Typography sx={{ mt: 2 }} variant='subtitle1'>
                                Overview: {movie.overview}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                        )
                      : (
                        <Typography variant='h6'>404 Movie not found</Typography>
                        )}
                  </>
                  )}
            </>
            )}
      </Box>
    </Container>
  )
}
export default DetailPage
