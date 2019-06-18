'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addConstraint('todos', ['id'], {
        type: Sequelize.INTEGER.UNSIGNED,
      }),
      queryInterface.addConstraint('todos', ['title'], {
        allowNull: false,
      }),
      queryInterface.addConstraint('todos', ['body'], {
        allowNull: false,
      }),
      queryInterface.addConstraint('todos', ['completed'], {
        allowNull: false,
        defaultValue: false
      })
  ];
  },

  down: (queryInterface, Sequelize) => {
    return [

    ]
  }
};
