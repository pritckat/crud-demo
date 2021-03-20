const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://dbUser:IkeM4VpKdrDWPvxx@cluster0.mxlyd.mongodb.net/test?retryWrites=true&w=majority"
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
  })
  .catch(error => console.error(error))

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })

