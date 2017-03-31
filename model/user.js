var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({


    name                :       { type: String },
    phone               :        { type: Number},
    email               :        {type: String,unqiue:true},
    password            :        {type: String},
    ans                 : [{
    						qno:{ type: String},
    						choice:[]
    					}]


        
   });

	module.exports = mongoose.model('User', UserSchema);