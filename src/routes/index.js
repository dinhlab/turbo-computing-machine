import { Routes, Route } from 'react-router-dom'
import BlankLayout from '../layouts/BlankLayout'
import MainLayout from '../layouts/MainLayout'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import AuthRequire from './AuthRequire'
import FavoriteMovies from '../pages/Favorite'
function Router () {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* Set the index route to the HomePage */}
        <Route index element={<HomePage />} />
        {/* Set the favorite route to the FavoriteMovies component wrapped with AuthRequire component */}
        <Route
          path='favorite'
          element={
            <AuthRequire>
              <FavoriteMovies />
            </AuthRequire>
          }
        />
        {/* Set the movie detail route to the DetailPage component wrapped with AuthRequire component */}
        <Route
          path='movie/:id'
          element={
            <AuthRequire>
              <DetailPage />
            </AuthRequire>
          }
        />
      </Route>
      {/* Set the routes that use the BlankLayout */}
      <Route element={<BlankLayout />}>
        {/* Set the login route to the LoginPage */}
        <Route path='/login' element={<LoginPage />} />
        {/* Set the not found route to the NotFoundPage */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
export default Router
