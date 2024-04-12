// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "https://secretscript.web.app"


    const fetchednotes = []

    const [notes, setNotes] = useState(fetchednotes);

    //fetching all notes

    const fetchnotes = async () => {
        //api call

        const url = `${host}/api/notes/fetchnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")  
            },
        });
        const allnotes = await response.json();
        setNotes(allnotes)
    }


    //adding a note
    const addnote = async (title, description, tag) => {

        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")  
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json= await response.json();
        const note=json;
        // const note = {
        //     "_id": "660429c76e78b7566ce1fd82",
        //     "user": "66039aff98e6a2138d8be251",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2024-03-27T14:14:31.253Z",
        //     "__v": 0
        // };
        setNotes(notes.concat(note))
    }

    //deleting a note
    const deletenote = async(id) => {
        //api call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")  
            },
        });
        console.log(response)

        const newnotes = notes.filter((fetchnotes) => {
            return fetchnotes._id !== id
        })
        setNotes(newnotes);
    }

    //edit a note
    const editnote = async (id, title, description, tag) => {
        //api call

        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")  
            },
            body: JSON.stringify({ title, description, tag }),
        });
        console.log(response)



        //logic for editing the note
        for (let index = 0; index < fetchednotes.length; index++) {
            const element = fetchednotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }



    //   const [notes, setNotes] = useState(fetchednotes)
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, fetchnotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;