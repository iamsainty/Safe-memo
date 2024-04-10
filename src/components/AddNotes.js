import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote]=useState({title: "", description: "", tag: ""})

    const addnotebtn=()=>{
        addnote(note.title, note.description, note.tag);
        props.showalert("Note created successfully", "success");
        setNote({ title: "", description: "", tag: "" });
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
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={change}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description } onChange={change} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={change} />
        </div>
        <button type="button" className="btn btn-primary" onClick={addnotebtn}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNotes
