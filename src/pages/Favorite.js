import { Grid, CardActionArea } from '@mui/material'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../app/config'
import Container from '@mui/material/Container'
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%'
}
function ProductCard ({ movie }) {
  const navigate = useNavigate()
  // extract the year from the release_date string
  const year = new Date(movie.release_date).getFullYear()
  return (
    <Card sx={cardStyle} onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component='img'
          width='300'
          image={`${IMAGE_URL}${movie.poster_path}`}
          alt='product image'
        />
        <CardContent>
          <Typography gutterBottom variant='body1' component='div'>
            {movie.title} ({year})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
function FavoriteMovies () {
  const [favoriteMovies, setFavoriteMovies] = useState([])
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {}
    setFavoriteMovies(Object.values(storedFavorites))
  }, [localStorage.getItem('favorites')])
  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        {favoriteMovies.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={3} lg={2}>
            <ProductCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default FavoriteMovies
