const mssql = require('mssql');

const config = {
    user: 'samer',
    password: 'Samer123456',
    server: 'localhost',
    database: 'test'
};

const poolPromise = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

  module.exports = poolPromise;