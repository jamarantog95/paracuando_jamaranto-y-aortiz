//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('tags', [
        {
          id: '1',
          name: 'Ropa y Accesorios',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '2',
          name: 'Deportes',
          description: '',
          image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '3',
          name: 'Conciertos',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '4',
          name: 'Meet & Greet',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '5',
          name: 'E-sport',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '6',
          name: 'Pop/Rock',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '7',
          name: 'Tecnologia',
          description: '',
          image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '8',
          name: 'Hogar y Decoracion',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '9',
          name: 'Abastecimiento',
          // description: '',
          // image_url: '',
          created_at: new Date(),
          updated_at: new Date()
        },
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
      await queryInterface.bulkDelete('tags', {
        name: {
          [Op.or]: [
            'Ropa y Accesorios',
            'Deportes',
            'Conciertos',
            'Meet & Greet',
            'E-sport',
            'Pop/Rock',
            'Tecnologia',
            'Hogar y Decoracion',
            'Abastecimiento',
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