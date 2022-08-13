let id = 1
// const entries = []
const entries = [{
    id: id++,
    datetime: new Date().toISOString(),
    mood: 3,
    note: 'Lorem ipsum dolor sit amet',
}, {
    id: id++,
    datetime: new Date().toISOString(),
    mood: 2,
    note: 'Lorem ipsum 2: electric boogaloo',
}, {
    id: id++,
    datetime: new Date().toISOString(),
    mood: 5,
    note: 'Lorem ipsum 3: Revolutions',
}]

export const listEntries = (req, res) => {
    res.type('json')
    res.send(JSON.stringify(entries))
}

export const createEntries = (req, res) => {
    req.body.id = id
    entries.push(req.body)
    res.status(201).send({id: id})
    id++
}

export const updateEntries = (req, res) => {
    for (let idx in entries) {
        if (entries[idx].id == req.body.id) {
            req.body.id = parseInt(req.body.id) // Ensure id in JSON object is correct
            entries[idx] = req.body
            res.send('Entry with id ' + req.body.id + ' updated.')
            return
        }
    }

    res.send('Entry with id ' + req.body.id + ' not found.')
}

export const deleteEntries = (req, res) => {
    for (let idx in entries) {
        if (entries[idx].id == req.params.id) {
            entries.splice(idx, 1)
            res.send('Entry with id ' + req.params.id + ' deleted.')
            return
        }
    }

    res.send('Entry with id ' + req.params.id + ' not found.')
}
