const express = require('express')
const app = express()
const PORT = 3000
const {dbConnection} = require('./config/config.js')
const routes = require('./routes/posts.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

dbConnection()

app.listen(PORT, ()=> {
    console.log('Server active on http://localhost:'+PORT)
})

module.exports = app