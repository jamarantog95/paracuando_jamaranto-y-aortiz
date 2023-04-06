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
        'usertags',
        [
          {
            tag_id: '1',
            user_id: '175eb931-7a65-4b4e-be46-af69dceacfae',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            tag_id: '2',
            user_id: '175eb931-7a65-4b4e-be46-af69dceacfae',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            tag_id: '5',
            user_id: '175eb931-7a65-4b4e-be46-af69dceacfae',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            tag_id: '7',
            user_id: '175eb931-7a65-4b4e-be46-af69dceacfae',
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
        'usertags',
        {
          name: {
            [Op.or]: ['3', '5', '2', '6'],
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
