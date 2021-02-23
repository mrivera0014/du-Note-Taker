const router = require('express').Router()
const fs = require('fs')
const { v4: uuid } = require('uuid')

router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var notes = JSON.parse(data)
        res.send(notes)
    })
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body
    const newNote = { title, text, id: uuid() }
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var currentNotes = JSON.parse(data)
        currentNotes.push(newNote)
        fs.writeFile('db/db.json', JSON.stringify(currentNotes), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(currentNotes)
    })
})

router.delete('/notes/:id', (req, res) => {
    var id = req.params.id
    console.log(req.params.id)
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var currentNotes = JSON.parse(data)
        var updateNotes = currentNotes.filter(note => note.id !== id)
        fs.writeFile('db/db.json', JSON.stringify(updateNotes), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(updateNotes)
    })
})

module.exports = router