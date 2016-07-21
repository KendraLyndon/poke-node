var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
}

function Trainers(){
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
    Trainers().where({id:poke[0].trainer_id}).then(function(trainer){
      res.render('pokemon/show',{poke:poke[0], trainer:trainer[0]})
    })
  })
});

router.post('/:id', function(req, res, next) {
  Pokemon().update({name:req.params.name}).where({id:req.params.id}).then(function(poke){
    Trainers().where({id:poke[0].trainer_id}).then(function(trainer){
      res.render('pokemon/show',{poke:poke[0], trainer:trainer[0]})
    })
  })
});

router.get('/:id/edit', function(req, res, next) {
  Pokemon().where({id:req.params.id}).then(function(poke){
    Trainers().select().then(function(trainers){
      console.log(trainers);
      res.render('pokemon/edit',{poke:poke[0], trainers:trainers})
    })
  })
});


module.exports = router;
