var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Trainers(){
  return knex('trainers');
};

function Pokemon(){
  return knex('pokemon');
};

router.get('/', function(req, res, next) {
  Trainers().select().then(function(trainers){
    Pokemon().select().then(function(pokemon){
      res.render('trainers/index', {pokemon:pokemon, trainers:trainers});
    })
  })
});

router.get('/:id', function(req, res, next) {
  Trainers().where({id:req.params.id}).then(function(trainer){
    Pokemon().where({trainer_id:req.params.id}).then(function(pokemon){
      res.render('trainers/show',{trainer:trainer[0], pokemon:pokemon});
    })
  })
});

module.exports = router;
