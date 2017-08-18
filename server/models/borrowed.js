module.exports = (sequelize, DataTypes) => {
  // Borrowed books model
  const Borrowed = sequelize.define('Borrowed', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    expires: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    returned: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: (models) => {
        /**Borrowed.BelongsTo(models.Books, {
          foreignKey: 'bookId',
          onDelete: 'CASCADE',
        });
        Borrowed.BelongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });**/
      },
    },
  });
  return Borrowed;
};
