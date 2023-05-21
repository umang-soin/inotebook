import React, {useContext} from "react";
import noteContext from "./notes/NoteContext";
import NoteItem from "./NoteItem";

const NC = () => {

  const context = useContext(noteContext);
  const {notes, setNotes} = context;

  return (
    <div className='row'>
        
        {notes.map((note) => {
            return <NoteItem note = {note}/>
        })}

    </div>
  )
}

export default NC