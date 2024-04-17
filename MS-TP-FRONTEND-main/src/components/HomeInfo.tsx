import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  useLoadScript,
} from "@react-google-maps/api"
import Places from './Places'
import { useNextMonthDisabled } from '@mui/x-date-pickers/internals'

type LatLogLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

const HomeInfo = ({ change, location, setLocation, radio, setRadio }: any) => {
  // const [location, setLocation] = useState<LatLogLiteral>()
  // const [radio, setRadio] = useState('3')
  const [newZoom, setNewZoom] = useState('13')
  const mapRef = useRef<GoogleMap>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const center = useMemo<LatLogLiteral>(() => ({ lat: -12.103321431813999, lng: -76.96337168465614 }), [])

  const options = useMemo<MapOptions>(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    // desabilita los siugientes para que el usuario se pueda mover
    gestureHandling: 'none',
    keyboardShortcuts: false,
  }), [])

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string
    setRadio(newValue);
    if (newValue === '1') {
      setNewZoom('14')
    } else if (newValue === '2') {
      setNewZoom('13')
    } else if (newValue === '3') {
      setNewZoom('13')
    } else if (newValue === '4') {
      setNewZoom('13')
    } else {
      setNewZoom('12')
    }
  }

  useEffect(() => {
    change(false)
  }, [])

  useEffect(() => {
    if (location !== null && radio !== null) {
      change(true)
    } else {
      change(false)
    }
  }, [location, radio])

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descripción lugar de vivienda
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Places setLocation={(position: any) => {
              setLocation(position)
              mapRef.current?.panTo(position)
            }} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kilometros a la redonda</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={radio}
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
          </Grid>
          <Grid item xs={12} sx={{ height: '400px' }}>
            <Paper
              sx={{ bgcolor: 'red', width: 1, height: 1 }}
              elevation={0}
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#1976D2",
  fillColor: "#5491F5",
};

export default HomeInfo
