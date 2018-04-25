const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Component = require('./component');

var FieldContentSchema = new Schema({
    field: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                Component.find({ "fields._id": v }, (err, result) => {
                    cb((result.length > 0), "Field doesn't exist!");
                })
            },
            message: "Error validating component field path."
        }
    },
    value: { 
        type: String,
        required: true
    }
})

var ContentSchema = new Schema({
    component: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                Component.find({"_id": v}, (err, result) => {
                    console.log(result);
                    cb((result.length > 0), "Component doesn't exist!");
                });
            },
            message: "Error validating component path."
        }
    },
    fieldContent: {
        type: [FieldContentSchema],
        required: true
    }
}, {
    collection: 'content'
});

module.exports = mongoose.model('Content', ContentSchema);