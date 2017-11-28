'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quest: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      title:{type: DataType.STRING, allowNull: true},
    description:{type: DataType.TEXT, allowNull:true},
    mind:{type: DataType.INTEGER, allowNull:true},
    body:{type: DataType.INTEGER, allowNull:true},
    soul:{type: DataType.INTEGER, allowNull:true},
    community:{type: DataType.INTEGER, allowNull:true},
    thriftiness:{type: DataType.INTEGER, allowNull:true},
    pawprint:{type: DataType.INTEGER, allowNull:true},
    happiness:{type: DataType.INTEGER, allowNull:true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quests');
  }
};