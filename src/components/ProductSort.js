import React from 'react'
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
function ProductSort ({ sortBy, onSortChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='sort-by-label'>Hot</InputLabel>
        <Select
          labelId='sort-by-label'
          id='sort-by-select'
          value={sortBy}
          onChange={onSortChange}
          label='Sort By'
          size='small'
          sx={{ width: 300 }}
        >
          <MenuItem value='topRated'>Top Rated Movies</MenuItem>
          <MenuItem value='upcoming'>Upcoming Movies</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
export default ProductSort
