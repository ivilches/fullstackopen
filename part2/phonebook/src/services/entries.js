import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll  = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

const create = async (entry) =>
  await axios.post(baseUrl, entry);

export default {
  getAll,
  create,
}
  
