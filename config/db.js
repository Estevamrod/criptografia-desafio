const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user','root','', {
    host: 'localhost',
    dialect: 'mysql'
});

    sequelize.authenticate().then(() => {
        console.log('A conexao com o banco de dados ocorreu com sucesso!');
    }).catch ((error) => {
        console.error('Nao foi possivel estabelecer uma conexao com o banco de dados', error);
    });

module.exports = sequelize;