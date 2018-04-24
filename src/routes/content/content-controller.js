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
    console.log(CREATE, CONTENT, COMPONENT);
    
    const newContent = new Content(req.body.content);

    newContent.save(err => {
        if (err) {
            console.log(chalk.red('✗'), chalk.red(err));
            return res.status(500).send(err);
        }

        console.log(chalk.green('✓'), "Content created!");
        console.log(chalk.gray(newContent));
        return res.sendStatus(200);
    });
}