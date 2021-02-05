let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    sNo: {
        type: Number,
        index: true
    },
    Date: {
        type: Date,
        index: true
    },
    City: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: 'salesPriceDatas'
    },
    Car: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: 'CompanyWiseDatas'
    },
    Color: {
        type: String,
        index: true
    },
    NumberOfVehiclesSold: {
        type: Number,
        index: true
    },




    "questions": [
        {
            "id": "TA1370",
            "question": "First Name",
            "options": null,
            "optional": false,
            "type": "FREETEXT",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1371",
            "question": "Last Name",
            "options": null,
            "optional": false,
            "type": "FREETEXT",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1372",
            "question": "Enter Date of Birth (YYYY-MM-DD)",
            "options": null,
            "optional": false,
            "type": "DATE",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1373",
            "question": "Enter Passport Number",
            "options": null,
            "optional": false,
            "type": "FREETEXT",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1374",
            "question": "Enter Passport Issued date (YYYY-MM-DD)",
            "options": null,
            "optional": false,
            "type": "DATE",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1375",
            "question": "Enter Passport Expiry date (YYYY-MM-DD)",
            "options": null,
            "optional": false,
            "type": "DATE",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1376",
            "question": "Enter Nationality (2-Digit Country code)",
            "options": null,
            "optional": false,
            "type": "FREETEXT",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1377",
            "question": "Enter Gender",
            "options": [
                "MALE",
                "FEMALE"
            ],
            "optional": false,
            "type": "OPTIONS",
            "isLeadOnly": false,
            "multiSelect": false
        },
        {
            "id": "TA1378",
            "question": "Enter Hotel Name",
            "options": null,
            "optional": true,
            "type": "FREETEXT",
            "isLeadOnly": false,
            "multiSelect": false
        }
    ],
});

const questionsModel = mongoose.model('questions', questionsSchema);

module.exports = questionsModel;