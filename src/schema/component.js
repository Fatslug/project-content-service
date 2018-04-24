const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Field = require('./field');

var ComponentSchema = new Schema({
    name: String,
    contentFields: [Field.schema]
}, {
    collection: 'components'
});

module.exports = mongoose.model('Component', ComponentSchema);