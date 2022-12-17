const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {type:String},
    city: {type:String},
    location: {type:String},
    role: {type:String},
    level: {type:String},
    contract: {type:String},
    position: {type:String},
    language: {type:String},
    postedAt:{type:String}
},
{ 
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
}
)
const JobsModel = mongoose.model('job',JobSchema);
module.exports  = JobsModel;