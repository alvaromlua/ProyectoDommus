import * as React from 'react';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Universidad } from '../models/universidad/Universidad.interface'
import { UniversidadService } from '../models/universidad/Universidad.service'
import { Carrera } from '../models/carrera/Carrera.interface'
import { CarreraService } from '../models/carrera/Carrera.service'
import { UsuarioService } from '../models/usuario/Usuario.service';
import { useEffect } from 'react';

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

export default function SignUp() {
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApelllido] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [fecha, setFecha] = React.useState<null | Date>(null)
  const [genero, setGenero] = React.useState('')
  const [universidad, setUniversidad] = React.useState('')
  const [carrera, setCarrera] = React.useState('')
  const [idCarrera, setIdCarrera] = React.useState<number>()
  const [contrasenia, setContrasenia] = React.useState('')
  const [confirmarContrasenia, setConfirmarContrasenia] = React.useState('')
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [universidadLista, setUniversidadLista] = React.useState<Universidad[]>()
  const [carreraLista, setCarreraLista] = React.useState<Carrera[]>()
  const [cargandoRegistro, setCargandoRegistro] = React.useState(false)
  const navigate = useNavigate()

  const getListaUniversidad = async () => {
    try {
      const universidadService = new UniversidadService()
      const output = await universidadService.listarUniversidad()
      setUniversidadLista(output)
    } catch (error) {
      setError(true)
      setErrorMessage(`Error: ${error}`)
    }
  }

  const getListaCarrera = async (pk: number) => {
    try {
      const carreraService = new CarreraService()
      const output = await carreraService.buscarCarreraSegunUniversidad(pk)
      setCarreraLista(output)
    } catch (error) {
      setError(true)
      setErrorMessage(`Error: ${error}`)
    }
  }

  const postUsuario = async () => {
    try {
      const data = {
        nombre: nombre,
        apellido: apellido,
        genero: genero === '1',
        fechaNacimiento: dayjs(fecha).format('YYYY-MM-DD 00:00'),
        correo: correo,
        carrera: idCarrera,
        tipoUsuario: 1,
        usuario: correo,
        contrasenia: contrasenia,
      }
      const usuarioService = new UsuarioService()
      const output = await usuarioService.crearUsuario(data)
      const emailOutput = await usuarioService.sendEmail(output.idUsuario)
      navigate('/sign-up-messg')
    } catch (error) {
      console.log(error)
      setError(true)
      setErrorMessage(`Error: ${error}`)
      setCargandoRegistro(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCargandoRegistro(true)

    if (contrasenia !== confirmarContrasenia) {
      setError(true)
      setErrorMessage('Las contraseñas ingresadas no coinciden')
      setCargandoRegistro(false)
    }
    else if (fecha === null) {
      setError(true)
      setErrorMessage('Tienes que selecionar una fecha')
      setCargandoRegistro(false)
    }
    else {
      postUsuario()
    }
  };

  useEffect(() => {
    getListaUniversidad()
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Registro
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  autoComplete="nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value.replace(/[^a-z]/gi, ''))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={apellido}
                  onChange={e => setApelllido(e.target.value.replace(/[^a-z]/gi, ''))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  name="correo"
                  autoComplete="email"
                  onChange={e => setCorreo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    label='Fecha de nacimiento'
                    sx={{ width: "100%" }}
                    value={fecha}
                    onChange={e => setFecha(e)} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth id='gender-form' >
                  <InputLabel id="demo-simple-select-gender" >Genero</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-gender"
                    id="gender"
                    label="Genero"
                    value={genero}
                    onChange={e => setGenero(e.target.value as string)}
                  >
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Femenino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-university">Universidad</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-university"
                    id="university"
                    value={universidad}
                    label="Universidad"
                    onChange={(e) => {
                      setUniversidad(e.target.value as string)
                      getListaCarrera(Number(e.target.value))
                    }}
                  >
                    {
                      universidadLista?.map((uni) => (
                        <MenuItem
                          key={uni.idUniversidad}
                          value={uni.idUniversidad}>
                          {uni.nombre}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-career">Carrera</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-career"
                    id="career"
                    value={carrera}
                    label="Carrera"
                    onChange={e => {
                      setCarrera(e.target.value as string)
                      setIdCarrera(Number(e.target.value))
                    }}
                  >
                    {
                      carreraLista?.map((carr) => (
                        <MenuItem
                          key={carr.idCarrera}
                          value={carr.idCarrera}>{carr.nombre}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contrasenia"
                  label="Constraseña"
                  type="password"
                  id="contrasenia"
                  autoComplete="contrasenia"
                  onChange={e => setContrasenia(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmarContrasenia"
                  label="Confirmar constraseña"
                  type="password"
                  id="confirmarContrasenia"
                  autoComplete="confirmarContrasenia"
                  onChange={e => setConfirmarContrasenia(e.target.value)}
                />
              </Grid>
            </Grid>
            {
              cargandoRegistro === false ?
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                > Registrarse
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
                  <span>Registrandose</span>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  ¿Ya tienes una cuenta?  Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}