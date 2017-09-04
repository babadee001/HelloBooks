module.exports = (sequelize, DataTypes) => {
  // Books model
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: DataTypes.FALSE,
      unique: false,
    },
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        /** Books.hasMany(models.Borrowed, {
          foreignKey: 'bookId',
        });**/
      },
    },
  });
  return Books;
};
