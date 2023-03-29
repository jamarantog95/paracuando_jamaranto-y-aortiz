//migration de States creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable('cities', {
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                state_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    foreignKey: true,
                    references: {
                        model: 'states',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },
                name: {
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
            await queryInterface.dropTable('cities', { transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}