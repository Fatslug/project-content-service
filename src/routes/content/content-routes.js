const express = require('express');
const router = express.Router();

const content = require('./content-controller');

router.post('/:componentID', content.createContentForComponentID);

router.get('/:contentID', content.getContentByID);
router.put('/:contentID', content.updateContentByID);
router.delete('/:contentID', content.deleteContentByID);

module.exports = router;