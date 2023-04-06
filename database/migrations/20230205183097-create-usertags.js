//migration de States creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable('usertags', {
                tag_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: true,
                    foreignKey: true,
                    references: {
                        model: 'tags',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },
                user_id: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    allowNull: true,
                    foreignKey: true,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
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
            await queryInterface.dropTable('usertags', { transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}