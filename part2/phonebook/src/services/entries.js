import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons'

const getAll  = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

const create = async (entry) =>
  await axios.post(baseUrl, entry);

const update = async (entry) => 
  await axios.put(`${baseUrl}/${entry.id}`, entry);

const remove = async (id) =>
  await axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  remove,
}
  
