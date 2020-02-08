import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll  = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

const create = async (entry) =>
  await axios.post(baseUrl, entry);

const remove = async (id) =>
  await axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  remove,
}
  
