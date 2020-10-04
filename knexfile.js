// Update with your config settings.
require('dotenv').config()
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: 'DevHelp',
      user:     process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
  },
};
