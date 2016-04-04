var mongoose = require('mongoose');
var restaurantSchema = new mongoose.Schema({
    
    name: {
        type: String,
        default: '',
        required: 'Name cannot be blank'
    },
    type: {
        type: String,
        default: '',
        required: 'Type cannot be blank'
    },
    owner: {
        type: String,
        default: ''
    },    
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: '',
        required: 'Type cannot be blank'
    }   
});

module.exports = mongoose.model('Restaurant', restaurantSchema);