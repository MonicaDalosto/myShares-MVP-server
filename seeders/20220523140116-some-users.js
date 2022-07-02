'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Apple',
          email: 'apple@apple.com',
          password: bcrypt.hashSync('apple', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Banana',
          email: 'banana@banana.com',
          password: bcrypt.hashSync('banana', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coco',
          email: 'coco@coco.com',
          password: bcrypt.hashSync('coco', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mango',
          email: 'mango@mango.com',
          password: bcrypt.hashSync('mango', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Grape',
          email: 'grape@grape.com',
          password: bcrypt.hashSync('grape', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
