/**
 * Created by mittalsh on 6/11/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    order_id: {
        type: Number
    },
    seller_id: {
        type: Number
    },
    rider_id: {
        type: Number
    },
    cluster_id: {
        type: Number
    },
    scheduled_time: {
        type: Date
    },
    delivered_time: {
        type: Date
    },
    pickup_latitude: {
        type: Number
    },
    pickup_longitude: {
        type: Number
    },
    delivered_latitude: {
        type: Number
    },
    delivered_longitude: {
        type: Number
    }
});

mongoose.model('OrderDetails', OrderSchema);
