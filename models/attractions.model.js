let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attractionsSchema = new Schema({
    id: {
        type: String,
        index: true
    },
    type: {
        type: String,
        index: true
    },
    active: {
        type : Boolean,
    },
    additionalInfo : {
        type : String
    },
    addressLine : {
        type : String
    },
    allPassengerDetailsRequired : {
        type : Boolean
    },
    askSpecialRequirements : {
        type : Boolean
    },
    category : {
        type : String
    },
    city : {
        type : String
    },
    contentApproved : {
        type : Boolean
    },
    country : {
        type : String
    },
    createdOn : {
        type : String
    },
    currency : {
        type : String
    },
    description : {
        type : String
    },
    dropoff : {
        type : Boolean
    },
    exclusions : {
        type : String
    },
    fromPrice : {
        type : Number
    },
    highlights : {
        type : String
    },
    hoursOfOperation : {
        type : Object
    },
    imagePath : {
        type : Array
    },
    inclusions : {
        type : String
    },
    keywords : {
        type : String
    },
    latitude : {
        type : String
    },
    longitude : {
        type : String
    },
    pickup : {
        type : Boolean
    },
    priceApproved : {
        type : Boolean
    },
    refMspPrice : {
        type : Number
    },
    refOriginalPrice : {
        type : Number
    },
    ticketTypesAndPackages : {
        type : Array,
        // ref : ``
    },
    title : {
        type : String,
    },
    updatedOn : {
        type : Date
    },
    video : {
        type : String
    },
    supplierId :{},

});

const attractionsModel = mongoose.model('attractions', attractionsSchema);

module.exports = attractionsModel;