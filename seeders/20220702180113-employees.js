'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          startDate: '2017-01-01',
          isActive: false,
          department: 'HR',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1
        },
        {
          startDate: '2018-04-01',
          isActive: false,
          department: 'HR',
          endDate: '2020-07-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2
        },
        {
          startDate: '2019-01-01',
          isActive: false,
          department: 'HR',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3
        },
        {
          startDate: '2019-10-01',
          isActive: false,
          department: 'HR',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4
        },
        {
          startDate: '2020-07-01',
          isActive: false,
          department: 'HR',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 5
        },
        {
          startDate: '2017-09-01',
          isActive: false,
          department: 'R&D',
          endDate: '2020-04-10',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 6
        },
        {
          startDate: '2017-06-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 7
        },
        {
          startDate: '2018-03-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 8
        },
        {
          startDate: '2019-10-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 9
        },
        {
          startDate: '2020-07-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 10
        },
        {
          startDate: '2020-06-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 11
        },
        {
          startDate: '2020-05-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 12
        },
        {
          startDate: '2020-01-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 13
        },
        {
          startDate: '2019-02-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 14
        },
        {
          startDate: '2020-04-01',
          isActive: false,
          department: 'Operations',
          endDate: '2021-10-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 15
        },
        {
          startDate: '2018-06-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 16
        },
        {
          startDate: '2019-05-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 17
        },
        {
          startDate: '2020-01-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 18
        },
        {
          startDate: '2020-02-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 19
        },
        {
          startDate: '2020-07-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 20
        },
        {
          startDate: '2019-01-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 21
        },
        {
          startDate: '2020-05-01',
          isActive: false,
          department: 'R&D',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 22
        },
        {
          startDate: '2020-01-01',
          isActive: false,
          department: 'Marketing',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 23
        },
        {
          startDate: '2019-02-01',
          isActive: false,
          department: 'Marketing',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 24
        },
        {
          startDate: '2020-03-01',
          isActive: false,
          department: 'Marketing',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 25
        },
        {
          startDate: '2019-06-01',
          isActive: false,
          department: 'Finance',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 26
        },
        {
          startDate: '2020-05-01',
          isActive: false,
          department: 'Finance',
          endDate: '2021-12-01',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 27
        },
        {
          startDate: '2020-01-01',
          isActive: false,
          department: 'Finance',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 28
        },
        {
          startDate: '2020-01-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 29
        },
        {
          startDate: '2020-08-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 30
        },
        {
          startDate: '2017-08-01',
          isActive: true,
          department: 'HR',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 31
        },
        {
          startDate: '2017-08-01',
          isActive: true,
          department: 'Finance',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 32
        },
        {
          startDate: '2017-08-01',
          isActive: false,
          department: 'Operations',
          endDate: '2022-08-03',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 33
        },
        {
          startDate: '2017-08-01',
          isActive: true,
          department: 'R&D',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 34
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
