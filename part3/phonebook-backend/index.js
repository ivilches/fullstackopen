const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let persons = require('./persons').persons;

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

  if (!existsPerson(id)) {
    return res.status(404).json({
      error: 'person not found',
    })
  }
  
  const person = persons.find(p => p.id === id);
  res.send(JSON.stringify(person));
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!existsPerson(id)) {
    return res.status(404).json({
      error: 'person not found',
    })
  }

  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const existsPerson = (id) => persons.some(p => p.id === id);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
})
