import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import FileUploadIcon from '@mui/icons-material/FileUpload'


const BasicInfo = ({ change, image, setImage, text, setText }: any) => {
  const handleImageChange = (event: any) => {
    const file = event.target.files[0]
    setImage(file)
  }

  useEffect(() => {
    if (image !== null && text.trim().split(/\s+/).length >= 100) {
      change(true)
    }
    else {
      change(false)
    }
  }, [image, text])

  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
        Analisis de personalidad
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: 1, minHeight: '450px' }}
      >
        <Grid item xs={12} sx={{ mb: 1, mt: 3 }}>
          {
            image ?
              (<Avatar src={URL.createObjectURL(image)} sx={{ width: '10rem', height: '10rem' }} />)
              :
              (<Avatar sx={{ width: '10rem', height: '10rem' }} />)
          }
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
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
        </Grid>
        <Grid item xs={12} sx={{ width: 1 }}>
          <TextField
            required
            fullWidth
            multiline
            rows={8}
            id="outlined-multiline-static"
            label="Describete a ti mismo en minimo 100 palabras"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment >
  )
}

export default BasicInfo
