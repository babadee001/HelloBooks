export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: DataTypes.FALSE,
    },
    isbn: {
      type: DataTypes.TEXT,
      required: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      required: true
    },
    catId: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        Book.hasOne(models.Category, {
          foreignKey: 'catId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Book;
};
