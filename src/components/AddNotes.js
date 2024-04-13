import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNotes = () => {
    const context = useContext(noteContext);
    const { addnote } = context;
    const [msg, setMsg] = useState('');

    const [note, setNote]=useState({title: "", description: ""})

    const addnotebtn=()=>{
      if (note.title==="") {
        setMsg("Title can't be empty")
      }
      else if(note.description===""){
        setMsg("Description can't be empty")
      }
       else {
        addnote(note.title, note.description);
        setNote({ title: "", description: ""});
        setMsg("");
      }
    }
    const change=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div style={{maxWidth: '100%'}}>
      <h1 style={{fontWeight: 'bolder'}}>Add a note</h1><br />
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" style={{border: '1px solid black', width: '100%'}} required  placeholder='Title' id="title" name="title" value={note.title} onChange={change}/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" style={{border: '1px solid black', width: '100%'}}  id="description" placeholder='Description' name="description" value={note.description } onChange={change} required />
        </div>
        <div style={{ color: 'red', paddingBottom: '2vh' }}>{msg}</div>
        <button type="button"  className="btn btn-outline-dark" style={{width: '100%'}} onClick={addnotebtn}>Add Note</button>
        
      </form>
    </div>
  )
}

export default AddNotes