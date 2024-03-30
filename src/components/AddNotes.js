import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNotes = () => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote]=useState({title: "", description: "", tag: ""})

    const addnotebtn=(e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }
    const change=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={change}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="textarea" className="form-control" id="description" name="description" onChange={change} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={addnotebtn}>Submit</button>
      </form>
    </div>
  )
}

export default AddNotes
