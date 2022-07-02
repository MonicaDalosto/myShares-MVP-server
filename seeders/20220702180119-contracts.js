'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'contracts',
      [
        {
          signatureDate: '2018-01-01',
          companyValuation: 1000000.0,
          totalCompanyShares: 1851852,
          grantedShares: 9259.26,
          cliffDate: '2019-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 1
        },
        {
          signatureDate: '2019-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 1
        },
        {
          signatureDate: '2020-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 1
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 1
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 1
        },
        {
          signatureDate: '2019-04-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-04-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 2
        },
        {
          signatureDate: '2020-04-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-04-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 2
        },
        {
          signatureDate: '2021-04-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-04-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 2
        },
        {
          signatureDate: '2022-04-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-04-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 2
        },
        {
          signatureDate: '2020-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 3
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 3
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 3
        },
        {
          signatureDate: '2020-10-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-10-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 4
        },
        {
          signatureDate: '2021-10-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-10-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 4
        },
        {
          signatureDate: '2021-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 5
        },
        {
          signatureDate: '2022-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 5
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contracts', null, {});
  }
};
