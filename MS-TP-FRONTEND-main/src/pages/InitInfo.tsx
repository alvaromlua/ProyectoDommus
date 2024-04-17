import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import BasicInfo from '../components/BasicInfo'
import HabitInfo from '../components/HabitInfo'
import HomeInfo from '../components/HomeInfo'
import { EightMpTwoTone } from '@mui/icons-material'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { UsuarioService } from '../models/usuario/Usuario.service'
import { ViviendaService } from '../models/vivienda/Vivienda.service'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Analisis personalidad', 'Analisis habitos', 'Detalles hogar'];

function getStepContent
  (
    step: number, change: any, image: any, setImage: any, text: any, setText: any,
    firstQuestion: any, setFirstQuestion: any, secondQuestion: any, setSecondQuestion: any, thirdQuestion: any, setThirdQuestion: any, fourthQuestion: any, setFourthQuestion: any,
    fifthQuestion: any, setFifthQuestion: any, sixthQuestion: any, setSixthQuestion: any, seventhQuestion: any, setSeventhQuestion: any, eighthQuestion: any, setEighthQuestion: any,
    ninthQuestion: any, setNinthQuestion: any, tenthQuestion: any, setTenthQuestion: any, location: any, setLocation: any, radio: any, setRadio: any,
  ) {
  switch (step) {
    case 0:
      return <BasicInfo change={change} image={image} setImage={setImage} text={text} setText={setText} />
    case 1:
      return <HabitInfo change={change} firstQuestion={firstQuestion} setFirstQuestion={setFirstQuestion} secondQuestion={secondQuestion} setSecondQuestion={setSecondQuestion}
        thirdQuestion={thirdQuestion} setThirdQuestion={setThirdQuestion} fourthQuestion={fourthQuestion} setFourthQuestion={setFourthQuestion} fifthQuestion={fifthQuestion} setFifthQuestion={setFifthQuestion}
        sixthQuestion={sixthQuestion} setSixthQuestion={setSixthQuestion} seventhQuestion={seventhQuestion} setSeventhQuestion={setSeventhQuestion} eighthQuestion={eighthQuestion}
        setEighthQuestion={setEighthQuestion} ninthQuestion={ninthQuestion} setNinthQuestion={setNinthQuestion} tenthQuestion={tenthQuestion} setTenthQuestion={setTenthQuestion} />
    case 2:
      return <HomeInfo change={change} radio={radio} setRadio={setRadio} location={location} setLocation={setLocation} />
    default:
      throw new Error('Unknown step');
  }
}

type LatLogLiteral = google.maps.LatLngLiteral

export default function InitInfo() {
  // steper variables
  const [activeStep, setActiveStep] = useState(0);
  const [completeInfo, setCompleteInfo] = useState(false)
  const [formularioEnviado, setFormularioEnviado] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  // basic-info variables
  const [image, setImage] = useState(null)
  const [text, setText] = useState('')

  // habit-info variables
  const [firstQuestion, setFirstQuestion] = useState<string | null>(null)
  const [secondQuestion, setSecondQuestion] = useState<string | null>(null)
  const [thirdQuestion, setThirdQuestion] = useState<string | null>(null)
  const [fourthQuestion, setFourthQuestion] = useState<string | null>(null)
  const [fifthQuestion, setFifthQuestion] = useState<string | null>(null)
  const [sixthQuestion, setSixthQuestion] = useState<string | null>(null)
  const [seventhQuestion, setSeventhQuestion] = useState<string | null>(null)
  const [eighthQuestion, setEighthQuestion] = useState<string | null>(null)
  const [ninthQuestion, setNinthQuestion] = useState<string | null>(null)
  const [tenthQuestion, setTenthQuestion] = useState<string | null>(null)

  // home-info variables
  const [location, setLocation] = useState<LatLogLiteral>()
  const [radio, setRadio] = useState<string | null>(null)

  useEffect(() => {
    if (activeStep === steps.length && formularioEnviado) {
      handleSubmit()
    }
  }, [activeStep, formularioEnviado])

  const changeCompleteInfo = (input: boolean) => {
    setCompleteInfo(input)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      setFormularioEnviado(true)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const dataHogar = {
        latitud: location?.lat,
        longitud: location?.lng,
        radio: radio,
        usuario: state.correo
      }
      const viviendaService = new ViviendaService()
      const viviendaOutput = await viviendaService.crearVivienda(dataHogar)
      // const formData = new FormData()
      const dataUsuario = {
        imagenPerfil: image,
        descripcion: text,
        puntajeHabito: 'A',
        vivienda: viviendaOutput.idVivienda,
        usuario: state.correo,
        primerIngreso: true
      }
      console.log(dataUsuario)
      const usuarioService = new UsuarioService()
      const usuarioOutput = await usuarioService.actulizarUsuario(state.idUsuario, dataUsuario)
      setFormularioEnviado(false)
      navigate('/dashboard/emparejamiento', { state: usuarioOutput })
    } catch {

    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Informacion clave
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Cargando información
              </Typography>
              <Typography variant="subtitle1">
                Estamos procesando la información, espere un momento.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent
                (
                  activeStep, changeCompleteInfo, image, setImage, text, setText,
                  firstQuestion, setFirstQuestion, secondQuestion, setSecondQuestion, thirdQuestion, setThirdQuestion, fourthQuestion, setFourthQuestion, fifthQuestion, setFifthQuestion,
                  sixthQuestion, setSixthQuestion, seventhQuestion, setSeventhQuestion, eighthQuestion, setEighthQuestion, ninthQuestion, setNinthQuestion, tenthQuestion, setTenthQuestion,
                  location, setLocation, radio, setRadio
                )
              }
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atrás
                  </Button>
                )}
                {
                  completeInfo ?
                    (<Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>)
                    :
                    (<Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      disabled
                    >
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>)
                }
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}