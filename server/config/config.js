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
    test: {
      username: "root",
      password: "password",
      database: "hellobooks_test",
      host: "127.0.0.1",
      port: 5432,
      dialect: "postgres"
      },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.dialect
  }
};
