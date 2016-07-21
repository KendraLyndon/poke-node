var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
}

function Trainer(){
  return knex('trainers');
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

router.get('/:id', function(req, res, next) {
  Pokemon().where({id:req.params.id}).then(function(poke){
    Trainer().where({id:poke[0].trainer_id}).then(function(trainer){
      res.render('pokemon/show',{poke:poke[0], trainer:trainer[0]})
    })
  })
});


module.exports = router;
