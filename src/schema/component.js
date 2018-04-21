const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Field = require('./field');

var ComponentSchema = new Schema({
    componentID: Number,
    name: String,
    fields: [Field.schema]
}, {
    collection: 'components'
});

module.exports = mongoose.model('Component', ComponentSchema);