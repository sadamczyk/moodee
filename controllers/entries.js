export const listEntries = (req, res) => {
    res.send('TODO: List entries')
}

export const createEntries = (req, res) => {
    console.log("TODO Create entry, body: ")
    console.log(req.body)
    res.sendStatus(200)
}

export const updateEntries = (req, res) => {
    res.send('TODO: Update entry ' + req.params.id)
}

export const deleteEntries = (req, res) => {
    res.send('TODO: Delete entry' + req.params.id)
}
