import axios from 'axios';

const getClassList = async () => {
  const { data } = await axios.get('/api/masters/class');
  return data;
};

const addNewClass = async (data) => {
  try {
    const response = await axios.post('/api/masters/class', { ...data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getClassList, addNewClass };
