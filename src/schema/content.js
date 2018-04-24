const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContentSchema = new Schema({
    component: { type: mongoose.Schema.Types.ObjectId, ref: 'Components' },
    fieldContent: [{
        fieldID: { type: mongoose.Schema.Types.ObjectId },
        value: String
    }]
}, {
    collection: 'content'
});

module.exports = mongoose.model('Content', ContentSchema);