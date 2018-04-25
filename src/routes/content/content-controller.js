'use strict';

const chalk = require('chalk');
const util = require('util');

const GET = chalk.black.bgGreen('Get');
const CREATE = chalk.black.bgMagenta('Create');
const UPDATE = chalk.black.bgCyan('Update');
const DELETE = chalk.black.bgRed('Delete');

const COMPONENT = chalk.black.bgBlue('ComponentID');
const CONTENT = chalk.black.bgMagenta('ContentID');
const CONTENTFOR = chalk.black.bgYellow('Content For');

const Content = require('../../schema/content');

/////////
////////
///////
//////
/////
////
///
//
//
// ALL CONTENT
//
// [POST] content/
//
exports.createContentForComponentID = (req, res) => {
    console.log(CREATE, CONTENTFOR, COMPONENT);
    
    const content = new Content(req.body.content);

    content.save(err => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        console.log(chalk.green('✓'), "Content created!");
        console.log(chalk.gray(content));
        return res.sendStatus(200);
    });
}

/////////
////////
///////
//////
/////
////
///
//
//
// CONTENT BY CONTENT ID
//
// [GET] content/:contentID
//
exports.getContentByID = (req, res) => {
    console.log(GET, CONTENT);

    Content.findById(req.params.contentID, (err, content) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!content) {
            console.log(chalk.red('✗'), chalk.red("No content with ID:", req.params.contentID));
            return res.status(500).send("No content with ID:" + req.params.contentID);
        }

        const foundContent = content;

        console.log(chalk.green('✓'), "Content found!");
        return res.status(200).send(foundContent);
    });
}
//
// [PUT] content/:contentID
//
exports.updateContentByID = (req, res) => {
    console.log(UPDATE, CONTENT);

    const updates = req.body.updates;
    // Check if a field is being set twice in FieldContent array
    var fieldIDs = updates.fieldContent.map(function(fieldContent){ return fieldContent.field });
    var isDuplicate = fieldIDs.some(function(field, idx){ 
        return fieldIDs.indexOf(field) != idx;
    });
    if (isDuplicate) {
        console.log(chalk.red('✗'), chalk.red("Duplicate FieldIDs detected!"));
        return res.status(500).send("Duplicate FieldIDs detected!");
    }

    Content.findByIdAndUpdate(req.params.contentID, updates, { 
        new: true,
        runValidators: true
    }, (err, content) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!content) {
            console.log(chalk.red('✗'), chalk.red("No content with ID:", req.params.contentID));
            return res.status(500).send("No content with ID:" + req.params.contentID);
        }

        console.log(chalk.green('✓'), "Content updated!");
        console.log(chalk.gray(content));
        return res.status(200).send(content);
    });
}
//
// [DELETE] content/:contentID
//
exports.deleteContentByID = (req, res) => {
    console.log(DELETE, CONTENT);

    Content.findByIdAndRemove(req.params.contentID, (err, content) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        if (!content) {
            console.log(chalk.red('✗'), chalk.red("No content with ID:", req.params.contentID));
            return res.status(500).send("No content with ID:" + req.params.contentID);
        }

        console.log(chalk.green('✓'), "Content deleted!");
        console.log(chalk.gray(content));
        return res.status(200).send(content._id);
    });
}

/////////
////////
///////
//////
/////
////
///
//
//
// CONTENT BY COMPONENT ID
//
// [GET] content/component/:componentID
//
exports.getContentByComponentID = (req, res) => {
    console.log(GET, CONTENTFOR, COMPONENT);

    Content.find({}).exec((err, content) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        const allContent = content;
        console.log(chalk.green('✓'), allContent.length, "pieces of content found!");
        return res.status(200).send(allContent);
    });
}
//
// [DELETE] content/:contentID
//
exports.deleteContentByComponentID = (req, res) => {
    console.log(DELETE, CONTENTFOR, COMPONENT);

    Content.deleteMany({ component: req.params.componentID }).exec((err, content) => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        const allContent = content;
        console.log(chalk.green('✓'), allContent.length, "pieces of content found!");
        return res.status(200).send(allContent);
    });
}