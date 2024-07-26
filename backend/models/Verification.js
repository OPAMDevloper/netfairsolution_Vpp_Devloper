const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    collectDonations: String,
    annualTurnover: String,
    businessAge: String,
    numEmployees: String,
    hasWebsite: String,
    websiteUrl: String,
    description: String,
    pan: String,
    businessName: String,
    registeredAddress: String,
    stateUT: String,
    pincode: String,
    gstin: String,
    bankAccountNumber: String,
    bankIFSC: String,
    panDocument: String,
    selectedDocument: String,
    bankDocument: String,
    businessAddressProof: String,
    email: String,
    profileimg: { type: String, default: null } // New field for profile image with default value of null
});

const Verification = mongoose.model('kycdetails', verificationSchema);

module.exports = Verification;
