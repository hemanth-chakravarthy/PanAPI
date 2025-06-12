const mongoose = require('mongoose');

const GSTDetailsSchema = new mongoose.Schema({
    referenceId: Number,
    gstin: String,
    legalName: String,
    tradeName: String,
    centerJurisdiction: String,
    stateJurisdiction: String,
    registrationDate: String,
    constitutionOfBusiness: String,
    taxpayerType: String,
    status: String,
    lastUpdated: String,
    natureOfBusiness: [String],
    principalAddress: String,
    principalSplitAddress: {
        building_name: String,
        street: String,
        location: String,
        building_number: String,
        district: String,
        state: String,
        city: String,
        flat_number: String,
        latitude: String,
        longitude: String,
        pincode: String
        },
        additionalAddresses: [
        {
            address: String,
            split_address: {
            building_name: String,
            street: String,
            location: String,
            building_number: String,
            district: String,
            state: String,
            city: String,
            flat_number: String,
            latitude: String,
            longitude: String,
            pincode: String
            }
        }
        ],
        valid: Boolean,
        message: String
    });


module.exports = mongoose.model('GSTDetails', GSTDetailsSchema);