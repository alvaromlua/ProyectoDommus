import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles'

let theme = createTheme()
theme = responsiveFontSizes(theme)

export const Home = () => {
  return (
    <React.Fragment>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={1}
        spacing={2}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h1" gutterBottom>
            Bienvenido
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Empieza y conecta ahora!
          </Typography>
        </ThemeProvider>
      </Stack>
    </React.Fragment >
  )
}
