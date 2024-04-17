import * as React from 'react'
import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { AuthService } from '../models/auth/Auth.service'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const { frs, snd } = useParams()
  const [correo, setCorreo] = React.useState('')
  const [contrasenia, setContrasenia] = React.useState('')
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [cargandoInicio, setCargandoInicio] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCargandoInicio(true)
    try {
      const data = {
        usuario: correo,
        contrasenia: contrasenia
      }
      const authService = new AuthService()
      const usuarioOutput = await authService.loginAccont(data)
      if (!usuarioOutput.primerIngreso) {
        navigate('/init-info', { state: usuarioOutput })
      } else {
        navigate('/dashboard/inicio', { state: usuarioOutput })
      }
    } catch (error: any) {
      setError(true)
      setErrorMessage(`${error.response.data.message}`)
      setCargandoInicio(false)
    }
  }

  useEffect(() => {
    try {
      const authService = new AuthService()
      authService.activateAccount(frs, snd)
    } catch {
      setError(true)
      setErrorMessage(`Error: ${error}`)
    }
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              autoFocus
              id="correo"
              label="Correo"
              name="correo"
              margin="normal"
              autoComplete="correo"
              onChange={e => setCorreo(e.target.value)}
            />
            <TextField
              required
              fullWidth
              id="contrasenia"
              label="Contraseña"
              name="contrasenia"
              type="password"
              margin="normal"
              autoComplete="contrasenia"
              onChange={e => setContrasenia(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            />
            {
              cargandoInicio === false ?
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                :
                <LoadingButton
                  disabled
                  loading
                  fullWidth
                  color="secondary"
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <span>Iniciando sesión</span>
                </LoadingButton>
            }
            {error === true &&
              <Alert
                variant="filled"
                severity="warning"
                sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/sign-up" variant="body2">
                  {"¿No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}