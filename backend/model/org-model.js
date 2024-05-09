const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    name:{type:String, require:true},
},
{
    timestamps:true
});

const org = mongoose.model('org', orgSchema);

module.exports = org;