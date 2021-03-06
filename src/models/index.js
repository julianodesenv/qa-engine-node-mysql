const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const ENV = process.env.NODE_ENV || 'development';
let sequelize = {};
const db = {};

if (ENV === 'production') {
    sequelize = new Sequelize('mysql://USERNAME:PASSWORD@HOST:PORT/DB_NAME', { operatorsAliases: Sequelize.Op });
} else {
    sequelize = new Sequelize('mysql://root:password@localhost:3306/qa-engine', { operatorsAliases: Sequelize.Op });
}

fs
    .readdirSync(__dirname)
    .filter(file => ( file.indexOf('.') !== 0 && (file !== 'index.js')))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object
    .values(db)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(db));

sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;