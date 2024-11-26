const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')
const { config } = require('dotenv')
const cors = require('cors')

config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

app.use((error, req, res, next) => {
    res.status(error.status || 400).send({
        message: error.message || "Something went wrong!",
        validation: error.validation
    })
})

app.listen(5000, async () => {
    console.log('Server started at http://localhost:5000')
    console.log('Press Ctrl+C to stop')
    await mongoose.connect("mongodb://127.0.0.1:27017/mern-vci5")
    console.log('MongoDB connected')
})