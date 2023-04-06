//migration de Countries creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.createTable('publicationstypes', {
            id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER
            },
            name: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            description: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            created_at: {
               type: Sequelize.DATE,
               allowNull: false,
            },
            updated_at: {
               type: Sequelize.DATE,
               allowNull: false,
            }
         }, { transaction })
         await transaction.commit()
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   },
   down: async (queryInterface, /*Sequelize*/) => {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.dropTable('publicationstypes', { transaction })
         await transaction.commit()
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   }
}