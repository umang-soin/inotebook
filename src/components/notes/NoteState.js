import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

   const notesInitial = [
    {
      "_id": "64688f5f2ed467381d3b582a",
      "user": "645596fafd362c382b7aeaa5",
      "title": "This is title",
      "description": "This is description",
      "tag": "This is tag",
      "date": "2023-05-20T09:14:07.960Z",
      "__v": 0
    },
    {
      "_id": "64688f742ed467381d3b582d",
      "user": "645596fafd362c382b7aeaa5",
      "title": "This is title Second",
      "description": "This is description Second",
      "tag": "This is tag Second",
      "date": "2023-05-20T09:14:28.367Z",
      "__v": 0
    },
    {
        "_id": "64688f742ed467381d3b582d",
        "user": "645596fafd362c382b7aeaa5",
        "title": "This is title Second",
        "description": "This is description Second",
        "tag": "This is tag Second",
        "date": "2023-05-20T09:14:28.367Z",
        "__v": 0
      },
      {
        "_id": "64688f742ed467381d3b582d",
        "user": "645596fafd362c382b7aeaa5",
        "title": "This is title Second",
        "description": "This is description Second",
        "tag": "This is tag Second",
        "date": "2023-05-20T09:14:28.367Z",
        "__v": 0
      },
      {
        "_id": "64688f742ed467381d3b582d",
        "user": "645596fafd362c382b7aeaa5",
        "title": "This is title Second",
        "description": "This is description Second",
        "tag": "This is tag Second",
        "date": "2023-05-20T09:14:28.367Z",
        "__v": 0
      },
      {
        "_id": "64688f742ed467381d3b582d",
        "user": "645596fafd362c382b7aeaa5",
        "title": "This is title Second",
        "description": "This is description Second",
        "tag": "This is tag Second",
        "date": "2023-05-20T09:14:28.367Z",
        "__v": 0
      }
  ]

  const [notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;