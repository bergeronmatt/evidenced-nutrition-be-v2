exports.up = function (knex) {
  return knex.schema.createTable("categories", (tbl) => {
    tbl.increments();
    tbl.smallint("parentId").notNullable();
    tbl.string("title").notNullable();
    tbl.string("metaTitle").notNullable();
    tbl.string("slug").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};
