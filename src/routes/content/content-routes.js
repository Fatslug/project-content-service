const express = require('express');
const router = express.Router();

const content = require('./content-controller');

router.post('/', content.createContentForComponentID);

router.get('/:contentID', content.getContentByID);
router.put('/:contentID', content.updateContentByID);
router.delete('/:contentID', content.deleteContentByID);

router.get('/component/:componentID', content.getContentByComponentID);
router.delete('/component/:componentID', content.deleteContentByComponentID);

module.exports = router;