const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

let notes = require('./notes').notes;

const getGeneratedId = () => notes.length > 0
  ? Math.max(...notes.map(n => n.id)) + 1
  : 1;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</>');
})

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === id);

  if (note) {
    res.json(note);
  }
  else {
    res.status(404).end();
  }
})


app.post('/api/notes', (req, res) => {
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

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(n => n.id !== id);

  res.status(204).end();
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
