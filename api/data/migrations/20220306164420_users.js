exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.integer("userId").notNullable().unique();
    tbl.string("firstName", 128).notNullable();
    tbl.string("lastName", 128).notNullable();
    tbl.string("email", 128).notNullable().unique();
    tbl.string("password", 255).notNullable();
    tbl.boolean("admin");
    tbl.boolean("author");
    tbl.integer("authorId").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
