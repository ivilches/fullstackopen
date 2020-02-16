import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return response.data.concat(nonExisting);
}
  

const create = async (newNote) => 
  await axios.post(baseUrl, newNote);

const update = async (note) => {
  const response = await axios.put(`${baseUrl}/${note.id}`, note);
  return response.data;
}
  

export default {
  getAll,
  create,
  update,
}