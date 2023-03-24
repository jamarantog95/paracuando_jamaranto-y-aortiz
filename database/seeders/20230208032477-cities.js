//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, /*Sequelize*/) {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.bulkInsert('cities', [
            {
               id: '1',
               state_id: '1',
               name: 'Lima',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '2',
               state_id: '1',
               name: 'Ancon',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '3',
               state_id: '2',
               name: 'Trujillo',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '4',
               state_id: '2',
               name: 'Viru',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '5',
               state_id: '3',
               name: 'Camana',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '6',
               state_id: '4',
               name: 'Urcos',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '7',
               state_id: '4',
               name: 'Cusco',
               created_at: new Date(),
               updated_at: new Date()
            },
            {
               id: '8',
               state_id: '3',
               name: 'Arequipa',
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
         await queryInterface.bulkDelete('cities', {
            name: {
               [Op.or]: [
                  'Lima',
                  'Ancon',
                  'Trujillo',
                  'Viru',
                  'Camana',
                  'Urcos',
                  'Cusco',
                  'Arequipa'
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