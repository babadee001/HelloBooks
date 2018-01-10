module.exports = {
  development: {
    username: 'postgres',
    password: 'andela',
    database: 'New',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.dialect,
    password: process.env.testpassword,
    database: process.env.testdatabase,
    host: process.env.testhost,
    port: process.env.testport,
    dialect: process.env.dialect
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.dialect
  }
};
