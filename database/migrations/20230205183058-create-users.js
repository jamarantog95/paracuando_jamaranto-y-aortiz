//migration de users creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      const transaction = await queryInterface.sequelize.transaction()
      try {
         await queryInterface.createTable('users', {
            id: {
               defaultValue: Sequelize.UUIDV4,
               primaryKey: true,
               type: Sequelize.UUID,
               allowNull: false,
            },
            first_name: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            last_name: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            email: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true,
            },
            username: {
               type: Sequelize.STRING,
               allowNull: true,
            },
            password: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            email_verified: {
               type: Sequelize.DATE
            },
            token: {
               type: Sequelize.TEXT
            },
            code_phone: {
               type: Sequelize.STRING
            },
            phone: {
               type: Sequelize.STRING
            },
            country_id: {
               type: Sequelize.INTEGER,
               allowNull: true,
               foreignKey: true,
               references: {
                  model: 'countries',
                  key: 'id'
               },
               onUpdate: 'CASCADE',
               onDelete: 'RESTRICT'
            },
            image_url: {
               type: Sequelize.STRING
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
         await queryInterface.dropTable('users', { transaction })
         await transaction.commit()
      } catch (error) {
         await transaction.rollback()
         throw error
      }
   }
}