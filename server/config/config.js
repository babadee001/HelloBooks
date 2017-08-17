module.exports = {
  "development": {
    "username": "postgres",
    "password": "andela",
    "database": "Hello",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": 'andela',
    "database": "database_test",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}
