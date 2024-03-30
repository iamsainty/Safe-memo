import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
  return (
    <>
    <AddNotes/>
      <div className='row'>
        <h1>Your notes</h1>
        {notes && notes.map((note) => {
          return <Noteitem key={note._id} note={note}/>
        })}
      </div>
      </>
  )
}

export default Notes
