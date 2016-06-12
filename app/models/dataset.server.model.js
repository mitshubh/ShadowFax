/**
 * Created by mittalsh on 6/11/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
    // a custom validation function for checking string length to be used by the model
    return (v.length <= 500 && v.length >= 3);
}

/**
 * Dataset Schema
 */
var DatasetSchema = new Schema({
        // Dataset model fields
        // ...
        created: {
            // types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
            type: Date,
            // default values can be set
            default: Date.now
        },
        description: {
            type: String,
            default: '',
            // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
            trim: true
        },
        name: {
            type: String,
            default: '',
            trim: true,
            unique : true,
            // make this a required field
            required: 'Name cannot be blank',
            // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
            validate: [validateLength, 'name must be in between 3 - 15 chars in length']
        }
    },
    { strict: false }
);

mongoose.model('Dataset', DatasetSchema);

