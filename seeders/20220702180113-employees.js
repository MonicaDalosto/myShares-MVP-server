'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          startDate: '2017-01-01',
          isActive: true,
          department: 'HR',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1
        },
        {
          startDate: '2018-04-01',
          isActive: true,
          department: 'R&D',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2
        },
        {
          startDate: '2019-01-01',
          isActive: true,
          department: 'Operations',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3
        },
        {
          startDate: '2019-10-01',
          isActive: true,
          department: 'Marketing',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4
        },
        {
          startDate: '2020-07-01',
          isActive: true,
          department: 'Operations',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 5
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
