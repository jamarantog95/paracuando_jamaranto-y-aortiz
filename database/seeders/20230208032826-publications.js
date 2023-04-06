'use strict';
const { Op } = require('sequelize');
const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    const usersSeeds = [
      {
        id: uuid.v4(),
        user_id: '175eb931-7a65-4b4e-be46-af69dceacfae',
        publication_type_id: '3 ',
        city_id: '1',
        title: 'Torneo relampago de voleibol',
        description:
          'Torneo amateur relampago que se realizará con fines recreativos',
        content: 'torneo',
        reference_link:
          'https://academlo.notion.site/Desarrollo-Pro-s-Backend-7f5a88da522840589c3cfc38bd4d3496',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    try {
      await queryInterface.bulkInsert('publications', usersSeeds, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    const user_id = ['175eb931-7a65-4b4e-be46-af69dceacfae'];

    try {
      await queryInterface.bulkDelete(
        'publications',
        {
          username: {
            [Op.or]: user_id,
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
