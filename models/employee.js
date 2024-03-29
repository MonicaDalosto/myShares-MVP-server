'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // employee belongsTo user
      employee.belongsTo(models.user, { foreignKey: 'userId' });
      // employees hasMany contracts
      employee.hasMany(models.contract);
    }
  }
  employee.init(
    {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    },
    {
      sequelize,
      modelName: 'employee'
    }
  );
  return employee;
};
