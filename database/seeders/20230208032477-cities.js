//Seeder creado

//noten que es igual a una migración!

'use strict';
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'cities',
        [
          {
            id: '1',
            state_id: '1',
            name: 'Neiva',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '2',
            state_id: '2',
            name: 'Bogotá',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '3',
            state_id: '3',
            name: 'Medellin',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '4',
            state_id: '4',
            name: 'Florencia',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete(
        'cities',
        {
          name: {
            [Op.or]: ['Neiva', 'Bogotá', 'Medellin', 'Medellin'],
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
