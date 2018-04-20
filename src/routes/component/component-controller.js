'use strict';

const chalk = require('chalk');

const GET = chalk.black.bgGreen('Get');
const CREATE = chalk.black.bgMagenta('Create');
const UPDATE = chalk.black.bgCyan('Update');
const DELETE = chalk.black.bgRed('Delete');

const COMPONENT = ' component by ' + chalk.black.bgBlue('ComponentID');
const FIELD = ' field by ' + chalk.black.bgMagenta('FieldID');

//
// ALL COMPONENTS
//
// GET components/
exports.getAllComponents = (req, res) => {
    console.log(GET, ' all components');
    res.sendStatus(200);
}
// POST components/
exports.createComponent = (req, res) => {
    console.log(CREATE, ' a component');
    res.sendStatus(200);
}

//
// COMPONENT BY COMPONENT ID
//
// GET components/:componentID
exports.getComponentByID = (req, res) => {
    console.log(GET, COMPONENT);
    res.sendStatus(200);
}
// PUT components/:componentID
exports.updateComponentByID = (req, res) => {
    console.log(UPDATE, COMPONENT);
    res.sendStatus(200);
}
// DELETE components/:componentID
exports.deleteComponentByID = (req, res) => {
    console.log(DELETE, COMPONENT);
    res.sendStatus(200);
}

//
// FIELD BY FIELD ID
//
// GET components/:ComponentID/fields/:FieldID
exports.getFieldByID = (req, res) => {
    console.log(GET, FIELD);
    res.sendStatus(200);
}
// PUT components/:ComponentID/fields/:FieldID
exports.updateFieldByID = (req, res) => {
    console.log(UPDATE, FIELD);
    res.sendStatus(200);
}
// DELETE components/:ComponentID/fields/:FieldID
exports.deleteFieldByID = (req, res) => {
    console.log(DELETE, FIELD);
    res.sendStatus(200);
}