'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Objectives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objective_Name: {
        type: Sequelize.STRING
      },
      is_Finished: {
        type: Sequelize.BOOLEAN
      },
      task_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tasks",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Objectives');
  }
};