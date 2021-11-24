const express=require('express');
const fetchuser=require('../middleware/fetchUser');
const router=express.Router();
const Notes=require('../model/Notes');
const { body, validationResult } = require('express-validator');
//Route 1: Get All the Notes using GET"/API/note/fetchallNote". Login required
router.get('/fetchallNote',fetchuser,async (req,res)=>{
    try {const note=await Notes.find({user:req.user.id});
    res.json(note); }
    catch (error) {
        console.error(error);
        res.status(500).send("SOME ERROR OCCUR");
     }
})
//Route 2: Get Add the Notes using POST"/API/note/addnote". Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a discription more than 5 character').isLength({ min: 5 }),
],async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}
      const note=new Notes({
          title,description,tag,user:req.user.id
      })
      const savednote=await note.save();
    res.json(savednote);}
    catch (error) {
        console.error(error);
        res.status(500).send("SOME ERROR OCCUR");
     }
})
//Route 3: put update  the Notes using PUT"/API/note/updatenote". Login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
const newNote={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};
let note=await Notes.findById(req.params.id)
if(!note){return res.status(404).send("Not Found");};
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed");
}
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
res.json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("SOME ERROR OCCUR");
     }
})
//Route 4: DELETE   the Notes using delete"/API/note/deletenote". Login required
router.delete('/delete/:id',fetchuser,async (req,res)=>{
    try{
let note=await Notes.findById(req.params.id)
if(!note){return res.status(404).send("Not Found");};
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed");
}
note=await Notes.findByIdAndDelete(req.params.id);
res.send("Deleted Successfully")
    }
    catch (error) {
        console.error(error);
        res.status(500).send("SOME ERROR OCCUR");
     }
})

module.exports=router;