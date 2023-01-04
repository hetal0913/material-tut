import { Container, Grid, Paper } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes')
     .then(res => res.json())
     .then(notes => setNotes(notes))
  }, [])

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE'
    })
    setNotes(notes.filter(note => note.id!== id))
  }

  const breakPoints = {
    deafult: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      {/* using the Grid */}
      {/* <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid> */}

      {/* using Masonry */}

      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
