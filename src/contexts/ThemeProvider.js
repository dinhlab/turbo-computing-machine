import { CssBaseline } from '@mui/material'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles'
const PRIMARY = {
  lighter: '#8DDAD5',
  light: '#46BFBF',
  main: '#008080',
  dark: '#00585B',
  darker: '#003131',
  contrastText: '#FFF'
}
const SECONDARY = {
  lighter: '#FFE3B3',
  light: '#FFC764',
  main: '#FF9900',
  dark: '#B76D00',
  darker: '#7F4600',
  contrastText: '#FFF'
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: '#FFF'
}
function ThemeProvider ({ children }) {
  const themeOptions = {
    palette: {
      mode: 'dark'
    },
    shape: { borderRadius: 4 }
  }
  const theme = createTheme(themeOptions)
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
export default ThemeProvider
