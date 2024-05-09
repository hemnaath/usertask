const mongoose = require('mongoose');
require('./org-model');

const userSchema = new mongoose.Schema({
    name:{type:String, require:true},
    username:{type: String, require:true, unique:true},
    password:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    role:{type:String, require:true},
    org_id:{type:mongoose.Schema.Types.ObjectId, ref:'org'}
},
{
    timestamps:true
});

const user = mongoose.model('user', userSchema);

module.exports = user;