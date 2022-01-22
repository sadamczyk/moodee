import express from 'express'
import entriesRouter from './routes/entries.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/entries', entriesRouter)

app.listen(4000, () => {
    console.log('Backend Server started!')
})
