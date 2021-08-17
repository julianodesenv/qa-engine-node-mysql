const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const ENV = process.env.NODE_ENV || 'development';
const db = {};

let sequelize = {};

if (ENV === 'production') {
    sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/qa-engine', { operatorsAliases: Sequelize.Op });
} else {
    sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/qa-engine', { operatorsAliases: Sequelize.Op });
}

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0 && (file !== 'index.js')))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object
    .values(db)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(db));

sequelize.sync({ logging: console.log });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;