var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Pokemon(){
  return knex('pokemon');
}

router.get('/', function(req, res, next) {
  var p1 = Number(req.cookies.p1);
  var p2 = Number(req.cookies.p2);
  var poke1;
  var poke2;
  Pokemon().select().then(function(pokemon){
    pokemon.forEach(function(poke){
      if(poke.id === p1){
        poke1 = poke;
      } else if(poke.id === p2){
        poke2 = poke;
      }
    });
    res.render('gym/index', {pokemon:pokemon, poke1:poke1, poke2:poke2, p1:p1, p2:p2});
  });
});

router.get('/clear', function(req, res, next){
  res.clearCookie('p1');
  res.clearCookie('p2');
  res.redirect('/gym')
})

module.exports = router;
