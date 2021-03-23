const secret = require('./secrets')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = `mongodb+srv://dbUser:${secret}@cluster0.mxlyd.mongodb.net/test?retryWrites=true&w=majority`
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            console.log('redirect')
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
      app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', {quotes: results})
          })
          .catch(/* ... */)
      })
  })
  .catch(error => console.error(error))

app.listen(3000, function() {
    console.log('listening on 3000')
})


