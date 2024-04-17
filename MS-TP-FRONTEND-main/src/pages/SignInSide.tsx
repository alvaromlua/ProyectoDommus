import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { AuthService } from '../models/auth/Auth.service'
import {
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

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

export default function SignInSide() {
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
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/4781415/pexels-photo-4781415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
                margin="normal"
                required
                fullWidth
                id="correo"
                label="Correo"
                name="correo"
                type="email"
                autoComplete="correo"
                onChange={e => setCorreo(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contrasenia"
                label="Contraseña"
                name="contrasenia"
                type="password"
                autoComplete="contrasenia"
                onChange={e => setContrasenia(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar"
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
                  <Link component={RouterLink} to="sign-up" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}