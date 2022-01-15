const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'plain/text', // application/json
        'Access-Control-Allow-Origin': '*',
    })
    res.write('Hello world!')
    res.end()
})

server.listen(4000, () => {
    console.log('Backend Server started!')
})
