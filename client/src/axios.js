import axios from 'axios';

const PORT = process.env.PORT || 5000;
export default axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  headers: { 'Content-Type': 'application/json' }
});
