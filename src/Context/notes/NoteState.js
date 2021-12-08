import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000";
    const initialnotes=[];
      //add note
const getNote=async()=>{
  const response = await fetch(`${host}/api/notes/fetchallNote`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json();
setNotes(json);
};
const addNote=async(title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
        },
 
    body: JSON.stringify({title,description,tag}) 
  });
  const note=await response.json();
  setNotes(notes.concat(note));
};
      //delete note
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/api/notes/delete/${id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
        },
 
  });

const newNotes=notes.filter((note)=>{return note._id!==id});
setNotes(newNotes);
}
//       //update note
      const editNote=async(id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
              },
       
          body: JSON.stringify({title,description,tag}) 
        });
let newNotes=JSON.parse(JSON.stringify(notes));
for (let index = 0; index < newNotes.length; index++) {

  if(newNotes[index]._id===id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
    break;  
  }
}
setNotes(newNotes);
}
const [notes,setNotes]=useState(initialnotes);
return(<NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
{props.children}
</NoteContext.Provider>)
};
      

export default NoteState;
