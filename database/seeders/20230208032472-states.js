//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, /*Sequelize*/) {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.bulkInsert('states', [
            {
               id: '1',
               country_id: '1',
               name: 'Lima',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '2',
               country_id: '1',
               name: 'La Libertad',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '3',
               country_id: '1',
               name: 'Arequipa',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '4',
               country_id: '1',
               name: 'Cusco',
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
         await queryInterface.bulkDelete('states', {
            name: {
               [Op.or]: [
                  'Lima',
                  'La Libertad',
                  'Arequipa',
                  'Cusco'
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