'use strict';

const { STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
    async up(queryInterface,Sequelize) {
        await queryInterface.createTable('choices', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey: true,
                allowNull: false
            },
            pollId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'polls',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            text: {
                type: STRING,
                allowNull: false
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('choices');
    }
};
