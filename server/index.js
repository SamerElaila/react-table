const express = require('express');
const request = require('request');
const app = express();

app.get('/api/get-data', (req, res) => {
  request('http://sherwin.retailscience.ca:5000/', (err, response, body) => {
    try {
      res.json({
        recordset: JSON.parse(body).recordset
      });
    } catch (e) {
      console.error(e);
      res.status(409).json({ msg: 'Cannot get data' });
    }
  });
});

app.listen(4001, () => {
  console.log('server is started at port 4001');
});
