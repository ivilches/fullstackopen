const express = require('express');

const app = express();

const persons = require('./persons');

app.get('/persons', (req, res) => {
  res.send(JSON.stringify(persons));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
})
