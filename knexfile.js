// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './api/data/data.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './api/data/migrations'
    },
    seeds: {
      directory: './api/data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },


  testing: {
    client: 'sqlite3',
    connection: {
      filename: './api/data/data.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './api/data/migrations'
    },
    seeds: {
      directory: './api/data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './api/data/data.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './api/data/migrations'
    },
    seeds: {
      directory: './api/data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },

};
