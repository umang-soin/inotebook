import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const s1 ={ 
        "name": "Umang",
        "class": "8-B"
    }

    const [state, setState] = useState(s1);

    const update = () => {

        setTimeout(() => {
            setState({
                "name": "Gmanu",
                "class": "10-B"
            })
        }, 1000)
    }

    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;