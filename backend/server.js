import express from 'express'
import entriesRouter from './routes/entries.js'
import mongoose from 'mongoose'
import {} from 'dotenv/config'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/entries', entriesRouter)

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log('Connected to database!')
        app.listen(4000, () => {
            console.log('Backend Server started!')
        })
    })
    .catch(err => console.log(err))
