module.exports = (sequelize, DataTypes) => {
  // Model for users
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    membership: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        /**Users.hasMany(models.borrowed, {
          foreignKey: 'userId',
        });**/
      },
    },
  });
  return Users;
};
