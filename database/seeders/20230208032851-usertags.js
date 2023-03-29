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
               user_id: 'a40f90cf-9345-4e26-978e-08a86755d975',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '5',
               user_id: 'beecc0b3-3486-4e0e-a7be-f9fb4429f440',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '2',
               user_id: 'beecc0b3-3486-4e0e-a7be-f9fb4429f440',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '6',
               user_id: 'beecc0b3-3486-4e0e-a7be-f9fb4429f440',
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