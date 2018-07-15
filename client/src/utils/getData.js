import axios from 'axios';

export default () =>
  axios
    .get('/api/get-data')
    .then(response => {
      return response.data.recordset;
    })
    .catch(err => {
      console.log(err);
    });
