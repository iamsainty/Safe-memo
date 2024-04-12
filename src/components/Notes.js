import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useRef } from 'react';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, fetchnotes, editnote } = context;
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        } else {
            fetchnotes();
        }
    })
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, edittitle: currentnote.title, editdescription: currentnote.description, edittag: currentnote.tag });
    }
    const ref = useRef(null);
    const refclose = useRef(null);
    const { addnote } = context;

    const [note, setNote] = useState({ edittitle: "", editdescription: "", edittag: "" })

    const update = (e) => {
        addnote(note.title, note.description, note.tag);
        editnote(note.id, note.edittitle, note.editdescription, note.edittag)
        refclose.current.click();
        props.showalert("Note updated succesfully", "success")
    }
    const change = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container" style={{marginTop: '15vh'}}>
                <div className="card p-4 rounded-circle-border shadow-lg" style={{}}>
                    <AddNotes showalert={props.showalert} />
                    <button ref={ref} type="button" style={{ display: 'none' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title" style={{fontWeight: 'bolder', fontSize: '4vh'}} id="exampleModalLabel">Edit note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body align-items-center">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" style={{border: '1px solid black'}} className="form-control" id="edittitle" name="edittitle" value={note.edittitle} onChange={change} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" style={{border: '1px solid black'}}  id="editdescription" value={note.editdescription} name="editdescription" onChange={change} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refclose} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button onClick={update} type="button" className="btn btn-outline-dark" >Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <h1 style={{color: 'white', fontWeight: 'bolder', marginTop: '5vh', marginBottom: '2vh'}}>Your notes</h1>
                    {(notes.length === 0) ? <p>No notes yet! Add one now.</p> : null}
                    {notes && notes.map((note) => {
                        return <Noteitem key={note._id} showalert={props.showalert} updateNote={updateNote} note={note} />
                    })}
                </div>

            </div>
        </>
    )
}

export default Notes
