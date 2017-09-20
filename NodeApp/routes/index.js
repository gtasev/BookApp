var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/books',function (req, res, next) {
  let db = req.app.get('db');
  db.collection('books').find({}).toArray().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
    });
});

router.get('/book/:id', function(req, res, next){
  let db = req.app.get('db');
  let id = req.params.id;
  db.collection('books').findOne({'_id': ObjectId(id)}).then((result) => {
    res.status(200).send(result);
    console.log('book sent');
  }).catch((err) => {
    res.status(500).send(err);
    });
});

router.post('/book', function (req, res, next) {
  let db = req.app.get('db');
  let book = req.body;
  db.collection('books').insertOne(book).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
    });
});

router.put('/book/:id', function (req, res, next) {
  let db = req.app.get('db');
  let book = req.body;
  let id = req.params.id;
  db.collection('books').findOneAndUpdate({'_id': ObjectId(id)}, book).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(result);
    });
});

router.delete('/book/:id', function (req, res, next) {
  let db = req.app.get('db');
  let id = req.params.id;
  db.collection('books').deleteOne({'_id': ObjectId(id)}).then((result) => {
    res.status(200).send(result);
    }).catch((err) => {
    res.status(500).send(err);
    });
});



module.exports = router;
