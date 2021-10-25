import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-react-642ff-default-rtdb.firebaseio.com'
});