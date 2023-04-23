import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../app/config'
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
export default ProductCard
