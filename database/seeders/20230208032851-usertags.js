//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, /*Sequelize*/) {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.bulkInsert('usertags', [
            {
               tag_id: '3',
               user_id: '6187c598-f14c-4490-8cfe-33b525cdab33',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '5',
               user_id: 'd60eb39e-f9c3-4e17-b85a-ff665d455620',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '2',
               user_id: 'd60eb39e-f9c3-4e17-b85a-ff665d455620',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '6',
               user_id: '6187c598-f14c-4490-8cfe-33b525cdab33',
               created_at: new Date(),
               updated_at: new Date()
            }
         ], { transaction })

         await transaction.commit()
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   },

   async down(queryInterface, /*Sequelize*/) {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.bulkDelete('usertags', {
            name: {
               [Op.or]: [
                  '3',
                  '5',
                  '2',
                  '6'
               ]
            }
         }, { transaction })
         await transaction.commit()
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   }
}