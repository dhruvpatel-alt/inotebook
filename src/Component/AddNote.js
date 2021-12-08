import React,{useContext,useState} from 'react';
import NoteContext from '../Context/notes/NoteContext';
function AddNote(props) {
   const context = useContext(NoteContext);
   const {addNote}=context;
   const [note,setNote]=useState({title:"",description:"",tag:"default"}); 
   const onClick=(e)=>{
       e.preventDefault();
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:"default"});
props.showalert("Note Added Successfully","success");

   };
   const onChange=(e)=>{
   setNote({...note,[e.target.name]:e.target.value})
   };

    return (
        <div>
                <h2>Add Notes</h2>
           <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.title} minLength={3} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="des" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.description} minLength={5} id="des" name="description" onChange={onChange} required/>
 <small className="container" id="restrict" style={{color:note.description.length<5||note.title.length<3?"red":"green"}}>Title must be atleast 3 letter and Description must be atleast 5 letters</small>
  </div>
  <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={onClick}>Add Notes</button>
</form>
        </div>
    )
}

export default AddNote
