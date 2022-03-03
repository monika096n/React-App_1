const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
let config = require('../server/allConfig')

app.use(express.json())
let db;
MongoClient.connect(config.connectionString).then(val => {
  db=val.db('React_app')
  app.get('/testRoute', (req, res) => {
    console.log('request test')
    res.end('Hello from Server!')
  })
  app.get('/', function (req, res) {
    db.collection('customers_info')
      .find()
      .toArray(function (err, items) {
        res.send(items)
      })
  })
  app.post('/create-data', function (req, res) {
    // Sending request to create a data
    db.collection('customers_info').insertOne({ text: req.body.text }, function (
      err,
      info
    ) {
      res.json(info.ops[0])
    })
  })
  app.put('/update-data', function (req, res) {
    // updating a data by it's ID and new value
    db.collection('customers_info').findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.body.id) },
      { $set: { text: req.body.text } },
      function () {
        res.send('Success updated!')
      }
    )
  })
  app.delete('/delete-data', function (req, res) {
    // deleting a data by it's ID
    db.collection('customers_info').deleteOne(
      { _id: new mongodb.ObjectId(req.body.id) },
      function () {
        res.send('Successfully deleted!')
      }
    )
  })
}).catch(err=>{ 
  console.log(err)
})
app.listen(config.PORT, () => {
  console.log(`Node.js App running on port ${config.PORT}...`)
})