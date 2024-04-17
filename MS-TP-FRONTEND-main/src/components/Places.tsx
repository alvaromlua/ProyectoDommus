import { useEffect, useRef, useState } from 'react';
import {
  ClickAwayListener,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material/'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import parse from 'autosuggest-highlight/parse'
import Autocomplete from '@mui/material/Autocomplete'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

interface PlacesProps {
  setLocation: (position: google.maps.LatLngLiteral) => void;
}

export default function Places({ setLocation }: PlacesProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleInput = (e: any) => {
    setValue(e.target.innerText);
  };

  const handleSelect = async (description: string) => {
    console.log(`respuesta -${description}-`)
    if (description !== undefined && description !== '') {
      setValue(description, false);
      clearSuggestions();

      const result = await getGeocode({ address: description })
      const { lat, lng } = await getLatLng(result[0])
      setLocation({ lat, lng })
    }
  };

  return (
    <ClickAwayListener onClickAway={() => clearSuggestions()}>
      <Autocomplete
        style={{ width: '100%' }}
        getOptionLabel={option =>
          typeof option === 'string' ? option : option.description
        }
        filterOptions={(x) => x}
        options={data}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={data.find(x => x.description === value)}
        onChange={(e: any) => {
          handleSelect(e.target.innerText)
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Ingresa punto de referencia"
            fullWidth
          />
        )}
        onInputChange={(event, newEvent) => {
          setValue(newEvent)
        }}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length]),
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <LocationOnIcon sx={{ color: 'text.secondary' }} />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </ClickAwayListener>
  );
};