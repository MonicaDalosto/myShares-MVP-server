'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'myCompany BV'
      },
      currentValuation: {
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false
      },
      totalCompanyShares: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'company'
    }
  );
  return company;
};
