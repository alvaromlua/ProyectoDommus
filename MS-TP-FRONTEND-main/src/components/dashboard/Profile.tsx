import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import TextField from '@mui/material/TextField'
import { useLocation, useNavigate } from 'react-router-dom'
import { UsuarioService } from '../../models/usuario/Usuario.service'
import Snackbar from '@mui/material/Snackbar'

export const Profile = () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  const [image, setImage] = useState(null)
  const [text, setText] = useState(state.descripcion)
  const [snack, setSnack] = useState({
    open: false,
    severity: '',
    text: ''
  })

  const handleClick = (textValue: string, severityValue: string) => {
    setSnack({
      open: true,
      severity: severityValue,
      text: textValue
    })
  }

  const handleClose = () => {
    setSnack({
      open: false,
      severity: '',
      text: ''
    })
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0]
    setImage(file)
  }

  const actualizarInformacionUsuario = async () => {
    try {
      const dataUsuario = {
        descripcion: text,
        imagenPerfil: image,
        usuario: state.correo
      }
      const usuarioService = new UsuarioService()
      const usuarioOutput = await usuarioService.actulizarUsuario(state.idUsuario, dataUsuario)
      handleClick('Actualización exitosa.', 'success')
      navigate('/dashboard/perfil', { state: usuarioOutput })
    } catch {
      handleClick('Se produjo un error actualizando el usuario.', 'error')
    }
  }

  return (
    <React.Fragment>
      <Box height={1}>
        <Grid height={1} container spacing={2}>
          <Grid item sm={3} xs={12}>
            <Box
              display='flex'
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: '#ffffff', width: '1', borderRadius: '5px', minHeight: '50%', p: '2rem', }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                {
                  image === null ?
                    <Avatar
                      src={`http://localhost:8000${state.imagenPerfil}`}
                      sx={{ width: '7rem', height: '7rem' }} />
                    :
                    <Avatar
                      src={URL.createObjectURL(image)}
                      sx={{ width: '7rem', height: '7rem' }} />
                }
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: '1rem', marginBottom: '0' }}>
                  {state.nombre + ' ' + state.apellido}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ marginTop: '0.1rem', marginBottom: '0' }}>
                  {state.correo}
                </Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FileUploadIcon />}
                  sx={{ marginTop: '1rem' }}
                >
                  Subir imagen
                  <input
                    accept='image/*,.png,.jpg,.jpeg,.gif'
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                width: '1',
                borderRadius: '5px',
                height: '100%',
                p: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 1 }}
              >
                Descripción
              </Typography>
              <TextField
                fullWidth
                id="standard-multiline-flexible"
                multiline
                rows={20}
                maxRows={20}
                value={text}
                onChange={e => setText(e.target.value)}
                sx={{ width: '1', flexGrow: 1, mb: 1 }}
              />
              <Button onClick={actualizarInformacionUsuario} variant="contained">Guardar</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {(() => {
          switch (snack.severity) {
            case 'success': return <Alert onClose={handleClose} severity='success' variant="filled" sx={{ width: '100%' }} >{snack.text}</Alert>;
            case 'error': return <Alert onClose={handleClose} severity='error' variant="filled" sx={{ width: '100%' }} >{snack.text}</Alert>;
          }
        })()}
      </Snackbar>
    </React.Fragment>
  )
}
