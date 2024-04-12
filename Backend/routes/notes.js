const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');



//fetching notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})



//adding notes
router.post('/addnote', fetchuser, [
    body('title', "Title can't be empty").isLength({ min: 1 }),
    body('description', "Description can't be empty").isLength({ min: 1 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        // const notes=await Notes.find({user: req.user.id});
        res.json(savenote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//update note

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        const newnote={};
        if(title){
            newnote.title=title
        };
        if(description){
            newnote.description=description
        };
        if(tag){
            newnote.tag=tag
        };


        var note=await Notes.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(400).send('Note updation not allowed')
        }

        note=await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new: true})
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//delete note

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        var note=await Notes.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(400).send('Note updation not allowed')
        }

        note=await Notes.findByIdAndDelete(req.params.id)
        res.json("Note has been deleted succesfully")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


module.exports = router