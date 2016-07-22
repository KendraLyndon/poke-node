var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
};

function Trainers(){
  return knex('trainers');
};

router.get('/', function(req, res, next) {
  var p1 = Number(req.cookies.p1);
  var p2 = Number(req.cookies.p2);
  Pokemon().select().then(function(pokemon){
    res.render('pokemon/index',{pokemon:pokemon, p1:p1, p2:p2})
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
  Trainers().where({name:req.body.trainer}).then(function(trainer){
    Pokemon().update({
      name:req.body.name,
      trainer_id:Number(trainer[0].id),
      cp:Number(req.body.cp)
    }).where({id:req.params.id}).then(function(){
      res.redirect('/pokemon/'+req.params.id);
    })
  })
});

router.get('/:id/edit', function(req, res, next) {
  Pokemon().where({id:req.params.id}).then(function(poke){
    Trainers().select().then(function(trainers){
      res.render('pokemon/edit',{poke:poke[0], trainers:trainers})
    })
  })
});

router.get('/:id/delete', function(req, res, next) {
  Pokemon().delete().where({id:req.params.id}).then(function(poke){
    res.redirect('/pokemon');
  })
});

router.get('/:id/assign', function(req, res, next) {
  Pokemon().update({in_gym:true}).where({id:req.params.id}).then(function(){
    if(!req.cookies.p1){
      res.cookie('p1',req.params.id);
    } else {
      res.cookie('p2',req.params.id);
    }
    res.redirect('/pokemon');
  })
});

router.post('/assign/:player', function(req, res, next) {
  Pokemon().update({in_gym:true}).where({id:req.body.playerid}).then(function(){
    res.cookie(req.params.player,req.body.playerid);
    res.redirect('/gym');
  })
});

router.get('/:id/remove/:player', function(req, res, next) {
  Pokemon().update({in_gym:false}).where({id:req.params.id}).then(function(){
    res.clearCookie(req.params.player);
    res.redirect('/pokemon');
  })
});

module.exports = router;
