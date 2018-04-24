const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var FieldSchema = new Schema({
    name: String,
    type: String
});

module.exports = {
    schema: FieldSchema,
    model: mongoose.model('Field', FieldSchema)
}