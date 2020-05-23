const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const logFormat = (tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',  
  tokens['response-time'](req, res), 'ms',
  JSON.stringify(req.body),
].join(' ');

app.use(morgan(logFormat, {
  skip: (req, res) => req.method !== 'POST',
}));

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

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const validatorResult = personValidator(body);

  if (!validatorResult.isValid) {
    return res.status(400).json({
      errors: validatorResult.errors.join(', ')
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: shortid.generate()
  };

  persons = persons.concat(newPerson);

  res.status(201).json(newPerson);
});

const personValidator = (person) => {
  const result = {
    isValid: true,
    errors: []
  };

  if (person.name.trim() === '') {
    result.isValid = false;
    result.errors = result.errors.concat('name must not be empty');
  }

  if (!person.number) {
    result.isValid = false;
    result.errors = result.errors.concat('number must not be empty');
  }

  if (existsPersonByName(person.name)) {
    result.isValid = false;
    result.errors = result.errors.concat('name already exists in the phonebook');
  }

  return result;
}

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!existsPersonById(id)) {
    return res.status(404).json({
      error: 'person not found',
    })
  }

  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const existsPersonById = (id) => persons.some(p => p.id === id);
const existsPersonByName = (name) => persons.some(p => p.name === name);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
})
