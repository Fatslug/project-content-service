'use strict';

const chalk = require('chalk');
const util = require('util');

const GET = chalk.black.bgGreen('Get');
const CREATE = chalk.black.bgMagenta('Create');
const UPDATE = chalk.black.bgCyan('Update');
const DELETE = chalk.black.bgRed('Delete');

const COMPONENT = chalk.black.bgBlue('ComponentID');
const FIELD = chalk.black.bgMagenta('FieldID');

const Component = require('../../schema/component');
const Field = require('../../schema/field').model;

//
// ALL COMPONENTS
//
// GET components/
exports.getAllComponents = (req, res) => {
    console.log(GET, ' all components');

    Component.find({}, (err, components) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        const allComponents = components;
        console.log(chalk.green('✓'), allComponents.length, "components found!");
        return res.status(200).send(allComponents);
    });
}
// POST components/
exports.createComponent = (req, res) => {
    console.log(CREATE, ' a component');
    
    const newComponent = new Component(req.body.component);

    newComponent.save(err => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        console.log(chalk.green('✓'), "Component created!");
        console.log(chalk.gray(newComponent));
        return res.sendStatus(200);
    });
}

//
// COMPONENT BY COMPONENT ID
//
// GET components/:componentID
exports.getComponentByID = (req, res) => {
    console.log(GET, COMPONENT);

    Component.findById(req.params.componentID, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!component) {
            console.log(chalk.red('✗'), chalk.red("No component with ID:", req.params.componentID));
            return res.status(500).send("No component with ID:" + req.params.componentID);
        }

        console.log(chalk.green('✓'), "Component found!");
        console.log(chalk.gray(component));
        return res.status(200).send(component);
    })
}
// PUT components/:componentID
exports.updateComponentByID = (req, res) => {
    console.log(UPDATE, COMPONENT);

    const updates = req.body.updates;

    Component.findByIdAndUpdate(req.params.componentID, updates, { 
        new: true 
    }, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!component) {
            console.log(chalk.red('✗'), chalk.red("No component with ID:", req.params.componentID));
            return res.status(500).send("No component with ID:" + req.params.componentID);
        }

        console.log(chalk.green('✓'), "Component updated!");
        console.log(chalk.gray(component));
        return res.status(200).send(component);
    });
}
// DELETE components/:componentID
exports.deleteComponentByID = (req, res) => {
    console.log(DELETE, COMPONENT);

    Component.findByIdAndRemove(req.params.componentID, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!component) {
            console.log(chalk.red('✗'), chalk.red("No component with ID:", req.params.componentID));
            return res.status(500).send("No component with ID:" + req.params.componentID);
        }

        console.log(chalk.green('✓'), "Component deleted!");
        console.log(chalk.gray(component));
        return res.status(200).send(component._id);
    })
}

//
// FIELD BY FIELD ID
//
// GET components/:componentID/fields/:fieldID
exports.getFieldByID = (req, res) => {
    console.log(GET, FIELD);

    Component.findById(req.params.componentID, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        const field = component.fields.id(req.params.fieldID);

        if (!field) {
            console.log(chalk.red('✗'), chalk.red("No field with ID:", req.params.fieldID));
            return res.status(500).send("No field with ID:" + req.params.fieldID);
        }

        console.log(chalk.green('✓'), "Field found!");
        console.log(chalk.gray(field));
        return res.status(200).send(field);
    });
}
// PUT components/:componentID/fields/:fieldID
exports.updateFieldByID = (req, res) => {
    console.log(UPDATE, FIELD);

    if (req.body.updates) { 
        req.body.updates._id = req.params.fieldID;
        console.log("Updates:", req.body.updates);
    }

    Component.findOneAndUpdate({ "_id": req.params.componentID, "fields._id": req.params.fieldID }, {
        "$set": {
            "fields.$": req.body.updates
        }
    }, { new: true }, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!component) {
            console.log(chalk.red('✗'), chalk.red("No field with ID:", req.params.fieldID));
            return res.status(500).send("No field with ID:" + req.params.fieldID);
        }

        console.log(chalk.green('✓'), "Field updated!");
        console.log(chalk.gray(component));
        return res.status(200).send(component);
    });
}
// DELETE components/:componentID/fields/:fieldID
exports.deleteFieldByID = (req, res) => {
    console.log(DELETE, FIELD);

    Component.findOneAndUpdate({ "_id": req.params.componentID, "fields._id": req.params.fieldID }, {
        "$pull": {
            "fields": {
                "_id": req.params.fieldID
            }
        }
    }, { new: true }, (err, component) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!component) {
            console.log(chalk.red('✗'), chalk.red("No field with ID:", req.params.fieldID));
            return res.status(500).send("No field with ID:" + req.params.fieldID);
        }

        console.log(chalk.green('✓'), "Field deleted!");
        console.log(chalk.gray(component));
        return res.sendStatus(200);
    });
}