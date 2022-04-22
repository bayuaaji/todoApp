'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Objective.belongsTo(models.Task, {
        as: "task",
        foreignKey:"task_id"
      })
    }
  }
  Objective.init({
    objective_Name: DataTypes.STRING,
    is_Finished: DataTypes.BOOLEAN,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Objective',
  });
  return Objective;
};