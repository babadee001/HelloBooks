module.exports = {
  // Migration for borrowed books
  up: (queryInterface, Sequelize) => queryInterface.createTable('Borroweds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bookId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    expires: {
      type: Sequelize.DATE,
    },
    returnDate: {
      type: Sequelize.DATE,
    },
    returned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Borroweds'),
};
