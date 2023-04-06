//migration de users creada por sequelize-cli y editada por nosotros
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'publications',
        {
          id: {
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
          },
          user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: true,
            foreignKey: true,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          publication_type_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey: true,
            references: {
              model: 'publicationstypes',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          city_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey: true,
            references: {
              model: 'cities',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          reference_link: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface /*Sequelize*/) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('publications', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
