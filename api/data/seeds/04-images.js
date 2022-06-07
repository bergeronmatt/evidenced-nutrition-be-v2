exports.seed = function (knex) {
  return knex("images").insert([
    {
      id: 1,
      name: "test",
      image: 'test'
    },
  ]);
};
