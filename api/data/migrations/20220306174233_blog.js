exports.up = function (knex) {
  return knex.schema.createTable("blog", (tbl) => {
    tbl.increments();
    tbl
      .smallint("authorId")
      .unsigned()
      .notNullable()
      .references("users.authorId")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.smallint("postId");
    tbl.string("title", 225).notNullable();
    tbl.string("metaTitle", 128).notNullable();
    tbl.string("slug", 128).notNullable().unique();
    tbl.text("summary").notNullable();
    tbl.boolean("published").notNullable();
    tbl.datetime("createdAt").notNullable();
    tbl.datetime("updatedAt");
    tbl.datetime("publishedAt").notNullable();
    tbl.blob("content").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("blog");
};
