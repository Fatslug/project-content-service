const express = require('express');
const router = express.Router();

const page = require('./page-controller');

router.get('/', page.getAllPages);
router.post('/', page.createPage);

// Get page by PageID
router.get('/:pageID', page.getPageByID);
router.put('/:pageID', page.updatePageByID);
router.delete('/:pageID', page.deletePageByID);

module.exports = router;