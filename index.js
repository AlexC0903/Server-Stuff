const express = require('express')
const app = express()
express.static('public')
const port = 3000


app.use('/spider', express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello_bob', (req, res) => res.send('Hello Bob!'))
app.get('/hello_2', (req, res) => res.send('Test'))
app.get('/hello*', (req, res) => res.send('Hello anything!'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

