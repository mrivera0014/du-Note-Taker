//dependencies
const express = require('express')
const htmlroutes = require('./routes/htmlroutes')
const apiroutes = require('./routes/notesroutes')

//function call
const app = express()
//setting up PORT
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static(__dirname + '/public'))



app.use('/api', apiroutes)
app.use('/', htmlroutes)
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))