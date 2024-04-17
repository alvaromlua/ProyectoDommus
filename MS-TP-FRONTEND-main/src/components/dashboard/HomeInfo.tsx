import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Places from '../Places'
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api"
import { useLocation, useNavigate } from 'react-router-dom'
import { ViviendaService } from '../../models/vivienda/Vivienda.service'
import { Vivienda } from '../../models/vivienda/Vivienda.interface'

type LatLogLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

export const HomeInfo = () => {
  const { state } = useLocation()
  const [radio, setRadio] = useState<string | null>(null)
  const libraries = useRef<Libraries>(['places']);
  const [newZoom, setNewZoom] = useState('13')
  const [location, setLocation] = useState<LatLogLiteral>()
  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLogLiteral>(() => ({ lat: -12.072867297966246, lng: -77.168620340836 }), [])
  const options = useMemo<MapOptions>(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    // gestureHandling: 'none',
    // keyboardShortcuts: false,
  }), [])
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries.current
  })

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string
    setRadio(newValue);
    if (newValue === '1') {
      setNewZoom('16')
    } else if (newValue === '2') {
      setNewZoom('15')
    } else if (newValue === '3') {
      setNewZoom('14')
    } else if (newValue === '4') {
      setNewZoom('14')
    } else {
      setNewZoom('13')
    }
  }

  const getViviendaInformacion = async () => {
    try {
      const viviendaService = new ViviendaService()
      const viviendaOutput = await viviendaService.buscarVivienda(state.vivienda)
      setLocation({ lat: viviendaOutput.latitud, lng: viviendaOutput.longitud })
      mapRef.current?.panTo({ lat: viviendaOutput.latitud, lng: viviendaOutput.longitud })
      setRadio(String(viviendaOutput.radio))
    } catch {

    }
  }

  useEffect(() => {
    getViviendaInformacion()
  }, [])

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <React.Fragment>
      <Box
        height={1}
        width={1}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          height={1}
          spacing={{ xs: 2, md: 3 }}
          columns={16}
        >
          <Grid item height={1} sm={4} xs={16}>
            <Box
              display='flex'
              justifyContent="start"
              alignItems="center"
              width='100%'
              height='100%'
              flexDirection='column'
              sx={{ backgroundColor: '#ffffff', borderRadius: '5px', p: '2rem', }}
            >
              <Places setLocation={(position: any) => {
                setLocation(position)
                mapRef.current?.panTo(position)
              }} />
              <FormControl fullWidth sx={{ mt: '1rem' }}>
                <InputLabel id="demo-simple-select-label">Kilometros a la redonda</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={radio || ''}
                  label="Kilometros a la redonda"
                  onChange={handleChange}
                >
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5</MenuItem>
                </Select>
              </FormControl>
              <Box
                display='flex'
                justifyContent="center"
                alignItems="end"
                width='100%'
                height='100%'
                sx={{ flexGrow: 1 }}
              >
                <Button variant="contained" sx={{ width: '100%' }}>
                  Guardar
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item height={1} sm={12} xs={16}>
            <Box
              display='flex'
              justifyContent="center"
              alignItems="center"
              width='100%'
              height='100%'
              sx={{ backgroundColor: '#ffffff', borderRadius: '5px', }}
            >
              <GoogleMap
                zoom={Number(newZoom)}
                center={center}
                options={options}
                onLoad={onLoad}
                mapContainerClassName='map-container'
              >
                {location && (
                  <>
                    <Marker position={location} />
                    <Circle center={location} radius={Number(radio) * 1000} options={closeOptions} />
                  </>
                )}
              </GoogleMap>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment >
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#1976D2",
  fillColor: "#5491F5",
};
