const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/file2.html', (req, res) => {
  res.sendFile(__dirname + '/file2.html')
})

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('ok');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})