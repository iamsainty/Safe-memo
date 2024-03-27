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
module.exports = router