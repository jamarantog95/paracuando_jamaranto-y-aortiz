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
        'states',
        [
          {
            id: '1',
            country_id: '1',
            name: 'Huila',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '2',
            country_id: '1',
            name: 'Cundinamarca',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '3',
            country_id: '1',
            name: 'Antioquia',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '4',
            country_id: '1',
            name: 'Caqueta',
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
        'states',
        {
          name: {
            [Op.or]: ['Huila', 'Cundinamarca', 'Antioquia', 'Caqueta'],
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
