module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        History.BelongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return History;
};
