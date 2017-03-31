var mongoose = require('mongoose');
var PresenterSchema = mongoose.Schema({


    name                : { type: String },
    orgname             : { type: String },
    phone               : { type: Number},
    email               : {type: String},
    password            : {type: String},
    verifiedcode        : {type: String},
    ques                : [{
    						           qno:{ type: Number},
    						           q:{ type: String},
                            choice:[{
                                       text:{ type: String},
                                       vote:{ type: Number}
                                   }]
    					   }],
    url                 :{type: String}


          
   });

	module.exports = mongoose.model('Presenter', PresenterSchema);