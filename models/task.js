'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.hasMany(models.Objective, {
        as: 'objective',
        foreignKey: 'task_id'
      })
    }
  }
  Task.init({
    title: DataTypes.STRING,
    action_time: DataTypes.DATE,
    is_Finished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};