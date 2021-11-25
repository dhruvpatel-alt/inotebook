import React,{useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
function Notes() {
    const context = useContext(NoteContext);
    const {notes,setNotes}=context;
    return (
        <div className="row my-3">
               <h2>Your Notes</h2>
           {notes.map((notes)=>{
             return <Noteitem notes={notes}/>
           })}
        </div>
    )
}

export default Notes
