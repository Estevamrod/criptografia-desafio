const { Sequelize,  DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const user = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    userDocument: { //cpf, por exemplo
        type:DataTypes.STRING,
        allowNull:false
    },
    creditCardToken: { //7 numeros, por exemplo
        type: DataTypes.STRING,
        allowNull: false
    },
    value: { //quantidade de dinheiro, por exemplo
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{timestamps: false});

module.exports = user;