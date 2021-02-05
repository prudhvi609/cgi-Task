let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketsSchema = new Schema({
    id: {
        type: String,
        index: true
    },
    ticketTypeFormat: {
        type: String,
        index: true
    },
    name: {
        type: String,
        index: true
    },
    description: {
        type: String,
        index: true
    },
    termsAndConditions: {
        type: String,
        index: true
    },
    isVisitDateCompulsory: {
        type: Boolean
    },
    isOpenDated: {
        type: Boolean
    },
    isSeparateEmail: {
        type: Boolean
    },
    advanceBookingDays: {
        type: String
    },
    validFor: {
        type: String
    },
    applyCapacity: {
        type: Boolean
    },
    duration: {
        type: String
    },
    extras: {
        type: Boolean
    },
    extrasList : {
        type : Array,
        index : true
    },
    variants : {
        type : Array,
        index : true
    },
    questions : {
        type : mongoose.Schema.Types.ObjectId,
        index : true,
        ref : ''
    }
});

const ticketsModel = mongoose.model('tickets', ticketsSchema);

module.exports = ticketsModel;