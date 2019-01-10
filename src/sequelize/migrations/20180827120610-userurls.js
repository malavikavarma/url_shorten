module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('urls', 'userId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },
  down(queryInterface) {
    return queryInterface.removeColumn('urls', 'userId');
  },
};
