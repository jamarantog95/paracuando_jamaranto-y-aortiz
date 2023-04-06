//migration de States creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable('states', {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    allowNull: false,
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
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
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
            await queryInterface.dropTable('states', { transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}