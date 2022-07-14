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
        },
        {
          signatureDate: '2018-09-01',
          companyValuation: 1000000.0,
          totalCompanyShares: 1851852,
          grantedShares: 9259.26,
          cliffDate: '2019-09-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 6
        },
        {
          signatureDate: '2019-09-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-09-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 6
        },
        {
          signatureDate: '2018-06-01',
          companyValuation: 1000000.0,
          totalCompanyShares: 1851852,
          grantedShares: 9259.26,
          cliffDate: '2019-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 7
        },
        {
          signatureDate: '2019-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 7
        },
        {
          signatureDate: '2020-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 7
        },
        {
          signatureDate: '2021-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 7
        },
        {
          signatureDate: '2022-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 7
        },
        {
          signatureDate: '2019-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 8
        },
        {
          signatureDate: '2020-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 8
        },
        {
          signatureDate: '2021-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 8
        },
        {
          signatureDate: '2022-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 8
        },
        {
          signatureDate: '2020-10-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-10-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 9
        },
        {
          signatureDate: '2021-10-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-10-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 9
        },
        {
          signatureDate: '2021-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 10
        },
        {
          signatureDate: '2022-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 10
        },
        {
          signatureDate: '2021-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 12
        },
        {
          signatureDate: '2022-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 12
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 13
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 13
        },
        {
          signatureDate: '2020-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 14
        },
        {
          signatureDate: '2021-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 14
        },
        {
          signatureDate: '2022-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 14
        },
        {
          signatureDate: '2021-04-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-04-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 15
        },
        {
          signatureDate: '2019-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2020-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 16
        },
        {
          signatureDate: '2020-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 16
        },
        {
          signatureDate: '2021-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 16
        },
        {
          signatureDate: '2022-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 16
        },
        {
          signatureDate: '2020-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 17
        },
        {
          signatureDate: '2021-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 17
        },
        {
          signatureDate: '2022-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 17
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 18
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 18
        },
        {
          signatureDate: '2021-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 19
        },
        {
          signatureDate: '2022-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 19
        },
        {
          signatureDate: '2021-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 20
        },
        {
          signatureDate: '2022-07-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 20
        },
        {
          signatureDate: '2020-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 21
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 21
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 21
        },
        {
          signatureDate: '2021-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 22
        },
        {
          signatureDate: '2022-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 22
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 23
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 23
        },
        {
          signatureDate: '2020-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 24
        },
        {
          signatureDate: '2021-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 24
        },
        {
          signatureDate: '2022-02-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 24
        },
        {
          signatureDate: '2021-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 25
        },
        {
          signatureDate: '2022-03-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-03-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 25
        },
        {
          signatureDate: '2020-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2500000,
          grantedShares: 6250.0,
          cliffDate: '2021-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 26
        },
        {
          signatureDate: '2021-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 26
        },
        {
          signatureDate: '2022-06-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 26
        },
        {
          signatureDate: '2021-05-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-05-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 27
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 28
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 28
        },
        {
          signatureDate: '2021-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 29
        },
        {
          signatureDate: '2022-01-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2023-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 29
        },
        {
          signatureDate: '2021-08-01',
          companyValuation: 2000000.0,
          totalCompanyShares: 2631579,
          grantedShares: 6578.95,
          cliffDate: '2022-08-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          employeeId: 30
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contracts', null, {});
  }
};
