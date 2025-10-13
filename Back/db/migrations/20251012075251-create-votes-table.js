'use strict';

const { STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
  * @param {import('sequelize').QueryInterface} queryInterface
  * @param {typeof import('sequelize')} Sequelize
  */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('votes', {
            pollId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'polls',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            username: {
                type: STRING,
                allowNull: false,
                primaryKey: true
            },
            choiceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'choices',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('votes');
    }
};
