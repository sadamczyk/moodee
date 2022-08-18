import mongoose from "mongoose"
const Schema = mongoose.Schema

const entrySchema = new Schema({
    mood: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    datetime: {
        type: Date,
        required: true
    }
})

const Entry = mongoose.model('Entry', entrySchema)

export default Entry
