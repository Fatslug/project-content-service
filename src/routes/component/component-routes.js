const express = require('express');
const router = express.Router();

const components = require('./component-controller');

router.get('/', components.getAllComponents);
router.post('/', components.createComponent);

router.get('/:componentID', components.getComponentByID);
router.put('/:componentID', components.updateComponentByID);
router.delete('/:componentID', components.deleteComponentByID);

router.get('/:componentID/field/:fieldID', components.getFieldByID);
router.put('/:componentID/field/:fieldID', components.updateFieldByID);
router.delete('/:componentID/field/:fieldID', components.deleteFieldByID);

module.exports = router;