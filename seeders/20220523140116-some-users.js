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
          password: bcrypt.hashSync('apple@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Banana',
          email: 'banana@banana.com',
          password: bcrypt.hashSync('banana@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coco',
          email: 'coco@coco.com',
          password: bcrypt.hashSync('coco@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mango',
          email: 'mango@mango.com',
          password: bcrypt.hashSync('mango@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Grapes',
          email: 'grapes@grapes.com',
          password: bcrypt.hashSync('grapes@12', SALT_ROUNDS),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Orange',
          email: 'orange@orange.com',
          password: bcrypt.hashSync('orange@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pineapple',
          email: 'pineapple@pineapple.com',
          password: bcrypt.hashSync('pineapple@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pomegranate',
          email: 'pomegranate@pomegranate.com',
          password: bcrypt.hashSync('pomegranate@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Avocado',
          email: 'avocado@avocado.com',
          password: bcrypt.hashSync('avocado@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Papaya',
          email: 'papaya@papaya.com',
          password: bcrypt.hashSync('papaya@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Watermelon',
          email: 'watermelon@watermelon.com',
          password: bcrypt.hashSync('watermelon@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Strawberry',
          email: 'strawberry@strawberry.com',
          password: bcrypt.hashSync('strawberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cherry',
          email: 'cherry@cherry.com',
          password: bcrypt.hashSync('cherry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apricot',
          email: 'apricot@apricot.com',
          password: bcrypt.hashSync('apricot@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kiwi',
          email: 'kiwi@kiwi.com',
          password: bcrypt.hashSync('kiwi@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jackfruit',
          email: 'jackfruit@jackfruit.com',
          password: bcrypt.hashSync('jackfruit@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lime',
          email: 'lime@lime.com',
          password: bcrypt.hashSync('lime@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Peach',
          email: 'peach@peach.com',
          password: bcrypt.hashSync('peach@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pear',
          email: 'pear@pear.com',
          password: bcrypt.hashSync('pear@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tamarind',
          email: 'tamarind@tamarind.com',
          password: bcrypt.hashSync('tamarind@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Blueberry',
          email: 'blueberry@blueberry.com',
          password: bcrypt.hashSync('blueberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Raspberry',
          email: 'raspberry@raspberry.com',
          password: bcrypt.hashSync('raspberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Blackberry',
          email: 'blackberry@blackberry.com',
          password: bcrypt.hashSync('blackberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Dragonfruit',
          email: 'dragonfruit@dragonfruit.com',
          password: bcrypt.hashSync('dragonfruit@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gooseberry',
          email: 'gooseberry@gooseberry.com',
          password: bcrypt.hashSync('gooseberry@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fig',
          email: 'fig@fig.com',
          password: bcrypt.hashSync('fig@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Guava',
          email: 'guava@guava.com',
          password: bcrypt.hashSync('guava@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Muskmelon',
          email: 'muskmelon@muskmelon.com',
          password: bcrypt.hashSync('muskmelon@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Olives',
          email: 'olives@olives.com',
          password: bcrypt.hashSync('olives@12', SALT_ROUNDS),
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Melon',
          email: 'melon@melon.com',
          password: bcrypt.hashSync('melon@12', SALT_ROUNDS),
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
