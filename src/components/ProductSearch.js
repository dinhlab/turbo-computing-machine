import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { useForm } from 'react-hook-form'
function ProductSearch ({ onSearch }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    onSearch(data.searchQuery)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name='searchQuery'
        sx={{ width: 300 }}
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        {...register('searchQuery')}
      />
    </form>
  )
}
export default ProductSearch
