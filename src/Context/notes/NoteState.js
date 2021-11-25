import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const initialnotes=[{
        "_id": "619f4e23986a3311e61e332c",
        "user": "619a31684c02cfb6a99f289d",
        "title": "MERN",
        "description": "This is MERN App",
        "tag": "personal",
        "date": "2021-11-25T08:49:39.615Z",
        "__v": 0
      },
      {
        "_id": "619f4e25986a3311e61e332e",
        "user": "619a31684c02cfb6a99f289d",
        "title": "MERN",
        "description": "This is MERN App",
        "tag": "personal",
        "date": "2021-11-25T08:49:41.216Z",
        "__v": 0
      }
      ,
      {
        "_id": "619f4e25986a3311e61e332e",
        "user": "619a31684c02cfb6a99f289d",
        "title": "MERN",
        "description": "This is MERN App",
        "tag": "personal",
        "date": "2021-11-25T08:49:41.216Z",
        "__v": 0
      }
      ,
      {
        "_id": "619f4e25986a3311e61e332e",
        "user": "619a31684c02cfb6a99f289d",
        "title": "MERN",
        "description": "This is MERN App",
        "tag": "personal",
        "date": "2021-11-25T08:49:41.216Z",
        "__v": 0
      }]
      const [notes,setNotes]=useState(initialnotes);
return(<NoteContext.Provider value={{notes,setNotes}}>
    {props.children}
</NoteContext.Provider>)
};
export default NoteState;