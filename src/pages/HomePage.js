import React, { useState, useEffect } from 'react'
import { Alert, Box, Container, Stack, Pagination } from '@mui/material'
import ProductFilter from '../components/ProductFilter'
import ProductSearch from '../components/ProductSearch'
import ProductSort from '../components/ProductSort'
import ProductList from '../components/ProductList'
import apiService from '../app/apiService'
import LoadingScreen from '../components/LoadingScreen'
import { API_KEY } from '../app/config'
function HomePage () {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('upcoming')
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre)
    setPage(1)
  }
  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const handleSortChange = (event) => {
    setSelectedGenre('All')
    setSortBy(event.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const genresRes = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}`
        )
        const genresData = genresRes.data.genres
        setGenres(genresData)
        let url
        if (sortBy === 'topRated') {
          url = `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        } else {
          url = `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
        }
        if (selectedGenre !== 'All') {
          const genreId = genresData.find((g) => g.name === selectedGenre)?.id
          url = `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
        }
        if (searchQuery) {
          url = `/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
        }
        const res = await apiService.get(url)
        setResults(res.data.results)
        setTotalPages(res.data.total_pages)
        setError('')
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [selectedGenre, searchQuery, page, sortBy])
  return (
    <Container sx={{ display: 'flex', minHeight: '100vh', mt: 3 }}>
      <Stack>
        <ProductFilter genres={genres} onGenreClick={handleGenreClick} />
      </Stack>
      <Stack>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent='space-between'
          mb={2}
        >
          <ProductSearch onSearch={setSearchQuery} />
          <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
        </Stack>
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
                    <ProductList results={results} />
                    )}
              </>
              )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            color='primary'
            onChange={(event, value) => {
              handlePageChange(event, value)
            }}
          />
        </Box>
      </Stack>
    </Container>
  )
}
export default HomePage
