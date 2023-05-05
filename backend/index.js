const connectToMongo = require("./db");
const express = require('express');
const bodyParser = require('body-parser');

connectToMongo();

const app = express()
const port = 3005;

app.use(express.urlencoded({ extended: true }));
// Middleware for req.body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})