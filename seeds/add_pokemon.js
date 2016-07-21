exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pokemon').del(),

    knex('pokemon').insert({id: 201, name: "Bulbasaur",
      cp: 15, in_gym: false, trainer_id: 1 }),
    knex('pokemon').insert({id: 202, name: "Ivysaur",
      cp: 60, in_gym: false, trainer_id: 1}),
    knex('pokemon').insert({id: 203, name: "Venasaur",
      cp: 100, in_gym: false, trainer_id: 2}),
    knex('pokemon').insert({id: 204, name: "Charmander",
      cp: 15, in_gym: false, trainer_id: 2}),
    knex('pokemon').insert({id: 205, name: "Charmeleon",
      cp: 55, in_gym: false, trainer_id: 2}),
    knex('pokemon').insert({id: 206, name: "Charizard",
      cp: 99, in_gym: false, trainer_id: 3}),
    knex('pokemon').insert({id: 207, name: "Squirtle",
      cp: 19, in_gym: false, trainer_id: 4}),
    knex('pokemon').insert({id: 208, name: "Wartortle",
      cp: 22, in_gym: false, trainer_id: 4}),
    knex('pokemon').insert({id: 209, name: "Blastoise",
      cp: 111, in_gym: false, trainer_id: 4}),
    knex('pokemon').insert({id: 210, name: "Caterpie",
      cp: 5, in_gym: false, trainer_id: 3}),
    knex('pokemon').insert({id: 211, name: "Metapod",
      cp: 18, in_gym: false, trainer_id: 1}),
    knex('pokemon').insert({id: 212, name: "Butterfree",
     cp: 104, in_gym: false, trainer_id: 1})
  );
};
