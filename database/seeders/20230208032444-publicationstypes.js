//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('publicationstypes', [
        {
          id: '1',
          name: 'Marcas y Tiendas',
          description: 'X',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '2',
          name: 'Artistas y Conciertos',
          description: 'X',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '3',
          name: 'Torneos',
          description: 'X',
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
      await queryInterface.bulkDelete('publicationstypes', {
        name: {
          [Op.or]: [
            'Marcas y Tiendas',
            'Artistas y Conciertos',
            'Torneos'
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