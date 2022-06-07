exports.up = function (knex) {
    return knex.schema.createTable("images", (tbl) => {
        tbl.increments();
        tbl.varchar("name", 255).notNullable().unique();
        tbl.blob('image').notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("images");
};

