'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const demoTodos = [1,2,3,4,5].map(num => {
    //   return {
    //     title: `demo title ${num}`,
    //     body: `I will show demo in meetup ${num}`,
    //     completed: false
    //   };
    // });
    let demoTodos = [];
    for(let i = 0; i < 5; i++){
      const todo = {
        title: `demo title ${i}`,
        body: `I will show demo in meetup ${i}`,
        completed: false
      };
      demoTodos.push(todo);
    }

    return queryInterface.bulkInsert("todos", demoTodos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
