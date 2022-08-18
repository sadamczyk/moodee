import Entry from '../models/entry.js'

export const listEntries = (req, res) => {
    Entry.find().exec(function(err, entries) {
        const entriesJSON = entries.map(function(entry) {
            return entry.toJSON()
        })

        res.send(entriesJSON)
    })
}

export const createEntries = (req, res) => {
    const entry = new Entry({
        mood: req.body.mood,
        note: req.body.note,
        datetime: req.body.datetime
    })
    entry.save()
        .then((result) => res.status(201).send({id: result.id}))
        .catch(err => {
            console.log(err)
            res.status(500).send()
        })

}

export const updateEntries = (req, res) => {
    Entry.updateOne({ _id: req.params.id }, req.body, err => {
        if (err) {
            console.log(err)
            return res.status(500).send('Entry with id ' + req.body.id + ' not found.')
        }
        res.send('Entry with id ' + req.body.id + ' updated.')
    })
}

export const deleteEntries = (req, res) => {
    Entry.deleteOne({ _id: req.params.id }, err => {
        if (err) {
            console.log(err)
            return res.status(500).send('Entry with id ' + req.params.id + ' not found.')
        }
        res.send('Entry with id ' + req.params.id + ' deleted.')
    })
}
