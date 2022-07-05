'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // contracts belongsTo employees
      contract.belongsTo(models.employee, { foreignKey: 'employeeId' });
    }
  }
  contract.init(
    {
      signatureDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      companyValuation: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      totalCompanyShares: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grantedShares: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      cliffDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'contract'
    }
  );
  return contract;
};
