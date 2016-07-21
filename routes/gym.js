var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
}

router.get('/', function(req, res, next) {
  Pokemon().select().then(function(pokemon){
    var p1 = Number(req.cookies.p1);
    var p2 = Number(req.cookies.p2);
    res.render('gym/index', {pokemon:pokemon, p1:p1, p2:p2});
  })
});

module.exports = router;
