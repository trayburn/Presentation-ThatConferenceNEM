const express = require('express')
const app = express()
const bodyparser = require('body-parser');

var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var Widget = mongoose.model('Widget', {
  name: String,
  quantityOnHand : Number,
  lastUpdated : { type: Date, default: Date.now }
});

mongoose.connect('mongodb://localhost/that',
  { useMongoClient: true }
)


app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.send(`Hello World ${req.query.msg}!`)
})

app.post('/', function (req, res) {
  var w = new Widget(req.body);
  w.save((err) => {
    res.send(w);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


//
//var w = new Widget({ name: "Fidget Spinners", quantityOnHand: 3 });
//
// var promise = w.save();
// promise.then((data) => {
//   console.log(`SUCCESS : Saved ${w.name}`);
// }).then(() => {
//   return Widget.find({}).exec();
// }).then((data) => {
//   console.log(data);
// }).then(() => {
//   return Widget.remove({});
// }).then(() => {
//   mongoose.connection.close();
// }).catch((err) => {
//   console.log('--------------------------------------------');
//   console.log(err);
//   console.log('--------------------------------------------');
// });
