'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      signatureDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      companyValuation: {
        type: Sequelize.NUMERIC(12, 2),
        allowNull: false
      },
      totalCompanyShares: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      grantedShares: {
        type: Sequelize.NUMERIC(12, 2),
        allowNull: false
      },
      cliffDate: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('contracts');
  }
};
