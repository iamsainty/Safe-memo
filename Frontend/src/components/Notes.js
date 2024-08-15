import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchnotes, editnote, deletenote } = context;
    const [note, setNote] = useState({ edittitle: "", editdescription: "", edittag: "" });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('safe-memo-token')) {
                navigate('/');
            } else {
                await fetchnotes(); // Wait for fetchnotes to complete
            }
        };

        fetchData(); // Call the fetchData function
        // eslint-disable-next-line
    }, [fetchnotes]);

    const updateNote = (currentnote) => {
        setNote({
            id: currentnote._id,
            edittitle: currentnote.title,
            editdescription: currentnote.description
        });
        setShowModal(true);
    }

    const update = () => {
        if (note.edittitle === "") {
            setMsg("Title can't be empty")
        }
        else if (note.editdescription === "") {
            setMsg("Description can't be empty")
        }
        else {
            editnote(note.id, note.edittitle, note.editdescription);
            setShowModal(false);
        }
    }

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container" style={{ marginTop: '15vh' }}>
            <div className="card p-4 rounded-circle-border shadow-lg" style={{ marginLeft: '2vh', marginRight: '2vh' }}>
                <AddNotes />
            </div>

            {showModal &&
                <>
                    <div className="modal-backdrop fade show"></div> {/* Add this overlay div */}
                    <div className="modal-backdrop fade show"></div> {/* Add this overlay div */}
                    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: '90%' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title" style={{ fontWeight: 'bolder', fontSize: '4vh' }}>Edit note</h1>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="edittitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="edittitle" name="edittitle" value={note.edittitle} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editdescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="editdescription" name="editdescription" value={note.editdescription} onChange={handleChange} />
                                        </div>
                                    </form>
                                </div>
                                <div style={{ color: 'red', paddingBottom: '2vh' }}>{msg}</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-dark" onClick={() => setShowModal(false)}>Close</button>
                                    <button type="button" className="btn btn-outline-dark" onClick={update}>Update Note</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            }

            <div className='row' style={{ marginLeft: '0.75vh', marginRight: '0.75vh' }}>
                <h1 style={{ color: 'white', fontWeight: 'bolder', marginTop: '5vh', marginBottom: '2vh' }}>Your notes</h1>
                {(notes.length === 0) && <p style={{ color: 'white' }}>No notes yet! Add one now.</p>}
                {notes.map(note => (
                    <Noteitem key={note._id} note={note} updateNote={updateNote} deletenote={deletenote} />
                ))}
            </div>
        </div>
    );
}

export default Notes;
