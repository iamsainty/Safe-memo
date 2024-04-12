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
      <h1 style={{fontWeight: 'bolder'}}>Add a note</h1><br />
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" style={{border: '1px solid black'}}  placeholder='Title' id="title" name="title" value={note.title} onChange={change}/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" style={{border: '1px solid black'}}  id="description" placeholder='Description' name="description" value={note.description } onChange={change} />
        </div>
        <button type="button" className="btn btn-outline-dark" style={{width: '25vh'}} onClick={addnotebtn}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNotes
