'use strict';

const { STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {typeof import('sequelize')} Sequelize
    */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('polls', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            creator: {
                type: STRING,
                allowNull: false,
            },
            title: {
                type: STRING,
                allowNull: false
            }
        });

    },

    async down(queryInterface) {
        await queryInterface.dropTable('polls');
    }
};
