import { useState, useEffect } from "react";
import NoteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    // const host = "http://localhost:5001";
    const host = 'https://safe-memo.vercel.app'

    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);

    const [fetchComplete, setFetchComplete] = useState(false); // Flag to track if fetchnotes has completed

    const fetchnotes = async () => {
        if (!localStorage.getItem('safe-memo-token')) {
            navigate('/login');
        } else {
            try {
                const url = `${host}/api/notes/fetchnotes`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": localStorage.getItem("safe-memo-token")
                    },
                });
                const allnotes = await response.json();
                setNotes(allnotes);
                setFetchComplete(true); // Set fetchComplete to true after fetchnotes completes
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }
    };

    useEffect(() => {
        if (!fetchComplete) { // Run fetchnotes only if fetchComplete is false
            fetchnotes();
        }
        // eslint-disable-next-line
    }, [ fetchComplete ]);

    const addnote = async (title, description, tag) => {
        try {
            const url = `${host}/api/notes/addnote`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("safe-memo-token")
                },
                body: JSON.stringify({ title, description, tag }),
            });
            const note = await response.json();
            setNotes([...notes, note]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deletenote = async(id) => {
        try {
            const url = `${host}/api/notes/deletenote/${id}`;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("safe-memo-token")
                },
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const editnote = async (id, title, description, tag) => {
        try {
            const url = `${host}/api/notes/updatenote/${id}`;
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("safe-memo-token")
                },
                body: JSON.stringify({ title, description, tag }),
            });
            setNotes(notes.map(note =>
                note._id === id ? { ...note, title, description, tag } : note
            ));
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, fetchnotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
