// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const fetchednotes = [
        {
            "_id": "660429c76e78b7566ce1fd82",
            "user": "66039aff98e6a2138d8be251",
            "title": "hekj",
            "description": "description goes here",
            "date": "2024-03-27T14:14:31.253Z",
            "__v": 0
        },
        {
            "_id": "660429c86e78b7566ce1fd84",
            "user": "66039aff98e6a2138d8be251",
            "title": " jbsjdc",
            "description": "description goes here",
            "date": "2024-03-27T14:14:32.484Z",
            "__v": 0
        },
        {
            "_id": "660429c96e78b7566ce1fd86",
            "user": "66039aff98e6a2138d8be251",
            "title": " cjj",
            "description": "description goes here",
            "date": "2024-03-27T14:14:33.194Z",
            "__v": 0
        },
        {
            "_id": "660429c96e78b7566ce1fd88",
            "user": "66039aff98e6a2138d8be251",
            "title": "jvdbjv",
            "description": "description goes here",
            "date": "2024-03-27T14:14:33.648Z",
            "__v": 0
        },
        {
            "_id": "66042a4bd4a90f634a5904a7",
            "user": "66039aff98e6a2138d8be251",
            "title": "bjvbj",
            "description": "description goes here",
            "tag": "tag1",
            "date": "2024-03-27T14:16:43.403Z",
            "__v": 0
        },
        {
            "_id": "6604e7333d497c7625bd78a1",
            "user": "66039aff98e6a2138d8be251",
            "title": "mytitle",
            "description": "description goes here",
            "tag": "tag1",
            "date": "2024-03-28T03:42:43.777Z",
            "__v": 0
        }
    ]

    const [notes, setNotes]= useState(fetchednotes);
    //adding a note
    const addnote=(title, description, tag)=>{
        const note={
            "_id": "660429c76e78b7566ce1fd82",
            "user": "66039aff98e6a2138d8be251",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-03-27T14:14:31.253Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
    }

    //deleting a note
    const deletenote=(id)=>{
        
    }

    //edit a note
    const editnote=(id)=>{
        
    }

    //   const [notes, setNotes] = useState(fetchednotes)
    return (
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;