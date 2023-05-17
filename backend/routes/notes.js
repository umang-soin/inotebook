const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, query, validationResult } = require("express-validator");

// Importing Notes Model
const Note = require("../models/Note");

// ROUTE 1 : Get all the notes GET: "api/notes/fetchallnotes" , Login required
router.get('/fetchallnotes', fetchuser, async (req,res) => {
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2 : Get all the notes POST: "api/notes/addnotes" , Login required
router.post('/addnote', fetchuser, 
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter a Valid email").isLength({ min: 5 }),

  async (req,res) => {
    try{
        const {title, description, tag} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.status(400).json({
            success: false,
            errors: errors.array(),
          });
        } else {
            const note = new Note({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id
            })
    
            const savedNote = await note.save();
            res.json(savedNote);
        }   
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    } 
});

// ROUTE 3 : Update existing Note GET: "api/notes/updatenote" , Login required
router.put('/updatenote/:id', fetchuser, async (req,res) => {
    try{
        const {title, description, tag} = req.body;

        // Create a new Note Obj
        let newNote = {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        // Find the note to be updated

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
        res.json(note);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : Delete existing Note DELETE: "api/notes/deletenote" , Login required
router.delete('/deletenote/:id', fetchuser, async (req,res) => {
    try{

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted", note:note});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
