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
      console.log(pokemon);
      res.render('trainers/index', {pokemon:pokemon, trainers:trainers});
    })
  })
});

module.exports = router;
