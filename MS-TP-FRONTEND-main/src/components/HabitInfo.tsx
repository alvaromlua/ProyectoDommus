import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Grid from '@mui/material/Grid'
import { useSearchParams } from 'react-router-dom'


const HabitInfo = ({ change, firstQuestion, setFirstQuestion, secondQuestion, setSecondQuestion, thirdQuestion, setThirdQuestion, fourthQuestion, setFourthQuestion,
  fifthQuestion, setFifthQuestion, sixthQuestion, setSixthQuestion, seventhQuestion, setSeventhQuestion, eighthQuestion, setEighthQuestion, ninthQuestion, setNinthQuestion,
  tenthQuestion, setTenthQuestion }: any) => {
  // const [sumaTotal, setSumaTotal] = useState(0)

  const handleFirstQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setFirstQuestion(newAlignment)
  }
  const handleSecondQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setSecondQuestion(newAlignment)
  }
  const handleThirdQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setThirdQuestion(newAlignment)
  }
  const handleFourthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setFourthQuestion(newAlignment)
  }
  const handleFifthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setFifthQuestion(newAlignment)
  }
  const handleSixthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setSixthQuestion(newAlignment)
  }
  const handleSevenQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setSeventhQuestion(newAlignment)
  }
  const handleEighthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setEighthQuestion(newAlignment)
  }
  const handleNinthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setNinthQuestion(newAlignment)
  }
  const handleTenthQuestion = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setTenthQuestion(newAlignment)
  }

  useEffect(() => {
    change()
  }, [])

  useEffect(() => {
    if (fifthQuestion !== null && secondQuestion !== null && thirdQuestion !== null && fourthQuestion !== null
      && fifthQuestion !== null && sixthQuestion !== null && seventhQuestion !== null && eighthQuestion !== null
      && ninthQuestion !== null && tenthQuestion !== null) {
      // setSumaTotal(Number(firstQuestion) + Number(secondQuestion) + Number(thirdQuestion) + Number(fourthQuestion) + Number(fifthQuestion) + Number(sixthQuestion) + Number(seventhQuestion) + Number(eighthQuestion) + Number(ninthQuestion) + Number(tenthQuestion))
      change(true)
    } else {
      change(false)
    }
  }, [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion, seventhQuestion, eighthQuestion, ninthQuestion, tenthQuestion])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Analisis de habitos
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="start"
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={firstQuestion}
            exclusive
            onChange={handleFirstQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={secondQuestion}
            exclusive
            onChange={handleSecondQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={thirdQuestion}
            exclusive
            onChange={handleThirdQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={fourthQuestion}
            exclusive
            onChange={handleFourthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={fifthQuestion}
            exclusive
            onChange={handleFifthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={sixthQuestion}
            exclusive
            onChange={handleSixthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={seventhQuestion}
            exclusive
            onChange={handleSevenQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={eighthQuestion}
            exclusive
            onChange={handleEighthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={ninthQuestion}
            exclusive
            onChange={handleNinthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Cual crees que es la pregunta?
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={'center'}>
          <ToggleButtonGroup
            value={tenthQuestion}
            exclusive
            onChange={handleTenthQuestion}
            aria-label="text alignment"
            sx={{ justifySelf: 'center' }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={6}>6</ToggleButton>
            <ToggleButton value={7}>7</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={9}>9</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default HabitInfo
