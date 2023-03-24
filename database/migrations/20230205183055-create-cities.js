//migration de States creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable('cities', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
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
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
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