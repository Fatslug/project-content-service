const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var FieldSchema = new Schema({
    fieldID: Number,
    name: String,
    type: String
});

module.exports = {
    schema: FieldSchema,
    model: mongoose.model('Field', FieldSchema)
}