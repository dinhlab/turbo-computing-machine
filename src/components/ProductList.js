import { Grid } from '@mui/material'
import ProductCard from './ProductCard'
function ProductList ({ results }) {
  return (
    <Grid container spacing={2} mt={1}>
      {results.map((movie, index) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}
export default ProductList
