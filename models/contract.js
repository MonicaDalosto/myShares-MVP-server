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
      // define association here
    }
  }
  contract.init(
    {
      signatureDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      companyValuation: {
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false
      },
      totalCompanyShares: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grantedShares: {
        type: DataTypes.NUMERIC(12, 2),
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
