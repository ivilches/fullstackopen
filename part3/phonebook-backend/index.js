const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const persons = require('./persons').persons;

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
})

app.get('/api/persons', (req, res) => {
  res.send(JSON.stringify(persons));
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (!person) {
    return res.status(404).json({
      error: 'person not found',
    })
  }
  res.send(JSON.stringify(person));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
})
