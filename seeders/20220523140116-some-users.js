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
          password: bcrypt.hashSync('Apple@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Banana',
          email: 'banana@banana.com',
          password: bcrypt.hashSync('Banana@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coconut',
          email: 'coconut@coconut.com',
          password: bcrypt.hashSync('Coconut@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mango',
          email: 'mango@mango.com',
          password: bcrypt.hashSync('Mango@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Grapes',
          email: 'grapes@grapes.com',
          password: bcrypt.hashSync('Grapes@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Orange',
          email: 'orange@orange.com',
          password: bcrypt.hashSync('Orange@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pineapple',
          email: 'pineapple@pineapple.com',
          password: bcrypt.hashSync('Pineapple@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pomegranate',
          email: 'pomegranate@pomegranate.com',
          password: bcrypt.hashSync('Pomegranate@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Avocado',
          email: 'avocado@avocado.com',
          password: bcrypt.hashSync('Avocado@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Papaya',
          email: 'papaya@papaya.com',
          password: bcrypt.hashSync('Papaya@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Watermelon',
          email: 'watermelon@watermelon.com',
          password: bcrypt.hashSync('Watermelon@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Strawberry',
          email: 'strawberry@strawberry.com',
          password: bcrypt.hashSync('Strawberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cherry',
          email: 'cherry@cherry.com',
          password: bcrypt.hashSync('Cherry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apricot',
          email: 'apricot@apricot.com',
          password: bcrypt.hashSync('Apricot@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kiwi',
          email: 'kiwi@kiwi.com',
          password: bcrypt.hashSync('Kiwi@123', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jackfruit',
          email: 'jackfruit@jackfruit.com',
          password: bcrypt.hashSync('Jackfruit@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lime',
          email: 'lime@lime.com',
          password: bcrypt.hashSync('Lime@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Peach',
          email: 'peach@peach.com',
          password: bcrypt.hashSync('Peach@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pear',
          email: 'pear@pear.com',
          password: bcrypt.hashSync('Pear@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tamarind',
          email: 'tamarind@tamarind.com',
          password: bcrypt.hashSync('Tamarind@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Blueberry',
          email: 'blueberry@blueberry.com',
          password: bcrypt.hashSync('Blueberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Raspberry',
          email: 'raspberry@raspberry.com',
          password: bcrypt.hashSync('Raspberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Blackberry',
          email: 'blackberry@blackberry.com',
          password: bcrypt.hashSync('Blackberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Dragonfruit',
          email: 'dragonfruit@dragonfruit.com',
          password: bcrypt.hashSync('Dragonfruit@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gooseberry',
          email: 'gooseberry@gooseberry.com',
          password: bcrypt.hashSync('Gooseberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fig',
          email: 'fig@fig.com',
          password: bcrypt.hashSync('Fig@1234', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Guava',
          email: 'guava@guava.com',
          password: bcrypt.hashSync('Guava@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Muskmelon',
          email: 'muskmelon@muskmelon.com',
          password: bcrypt.hashSync('Muskmelon@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Olives',
          email: 'olives@olives.com',
          password: bcrypt.hashSync('Olives@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Melon',
          email: 'melon@melon.com',
          password: bcrypt.hashSync('Melon@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mônica teste',
          email: 'monica.kerber@gmail.com',
          password: bcrypt.hashSync('Monica@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mônica teste 2',
          email: 'moniquinha_k@hotmail.com',
          password: bcrypt.hashSync('Moniquinha@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mônica teste 3',
          email: 'mk.dalosto@gmail.com',
          password: bcrypt.hashSync('Mk.dalosto@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rafael teste',
          email: 'rf.dalosto@gmail.com',
          password: bcrypt.hashSync('Rafael@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Shannon test',
          email: 'shannon@quicargo.com',
          password: bcrypt.hashSync('Shannon@12', SALT_ROUNDS),
          isAdmin: true,
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
