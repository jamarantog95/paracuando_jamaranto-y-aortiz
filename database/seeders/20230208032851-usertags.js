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
               user_id: '4b852fec-8e95-482c-adc1-20fe9a1204c2',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '5',
               user_id: '4b852fec-8e95-482c-adc1-20fe9a1204c2',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '2',
               user_id: '9f4287b9-6b9f-413f-803f-65f22fc671cf',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               tag_id: '6',
               user_id: '4b852fec-8e95-482c-adc1-20fe9a1204c2',
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