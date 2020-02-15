const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world</>');
})

app.get('/notes', (req, res) => {
  res.json(notes);
})

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === id);

  if (note) {
    res.json(note);
  }
  else {
    res.status(404).end();
  }
})

const getGeneratedId = () => notes.length > 0
  ? Math.max(...notes.map(n => n.id)) + 1
  : 1;

app.post('/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    id: getGeneratedId(),
    content: body.content,
    date: new Date().toISOString(),
    important: body.important || false
  };

  notes = notes.concat(note);

  res.status(201).json({
    created: note
  });
})

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(n => n.id !== id);

  res.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
