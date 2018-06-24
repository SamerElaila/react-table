require('env2')('config.env');
const express = require('express');
const app = express();

const data = require('./crypto.json');


// const dbConnection = require('./database');

// app.get('/', async (req, res) => {
//     try {
//       const pool = await dbConnection
//       const result = await pool.request()
//           .execute('getAll');
  
//       res.json(result.recordset)
//     } catch (err) {
//       res.status(500).json({msg: err.message})
//     }
//   })

app.get('/api/data', (req,res) => {
  res.json({rows: data.recordset, columns: Object.keys(data.recordset[0])});
});

app.listen(4001, () => {
    console.log("server is started at port 4001");
});