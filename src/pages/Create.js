import React from 'react'
import { Button, Typography, Container, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import { SendOutlined, KeyboardArrowRightOutlined} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  btn: {
    backgroundColor: 'violet',
    fontSize: 60,
    '&:hover': {
      backgroundColor: 'blue',
    }
  },
  title: {
    textDecoration: 'underline',
    marginBottom: 20
  },
  field: {
    marginBottom: 20,
    marginTop: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setDetailsError(false)
    setTitleError(false)

    if(title == ''){
      setTitleError(true)
    }
    if(details == ''){
      setDetailsError(true)
    }
    if (title && details){
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, details, category
        })
      }).then(() => history.push("/"))
    }
  }

  return (
    <Container>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        className={classes.title}
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Notes'
          variant='outlined'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Details'
          variant='outlined'
          multiline
          minRows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel control={<Radio />} value="money" label="Money"/>
            <FormControlLabel control={<Radio />} value="todos" label="Todos"/>
            <FormControlLabel control={<Radio />} value="work" label="Work"/>
            <FormControlLabel control={<Radio />} value="reminders" label="Reminders"/>
          </RadioGroup>
        </FormControl>

        <Button
          // className={classes.btn}
          type='submit'
          color='primary'
          variant='contained'
          // startIcon={<SendOutlined/>}
          endIcon={<KeyboardArrowRightOutlined/>}
          disableElevation
        >
          Submit
        </Button>
      </form>


    </Container>
  )
}
