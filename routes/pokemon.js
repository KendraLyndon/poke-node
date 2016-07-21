var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
}

router.get('/', function(req, res, next) {
  Pokemon().select().then(function(pokemon){
    res.render('pokemon/index',{pokemon:pokemon})
  })
});

router.post('/', function(req, res, next) {
  Pokemon().insert(req.body).then(function(){
    res.redirect('/pokemon');
  })
});

router.get('/new', function(req, res, next) {
  res.render('pokemon/new');
});


module.exports = router;
