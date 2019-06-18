'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todos', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};