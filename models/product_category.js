const mongoose = require('mongoose');
const user = require('../models/users')

const product_cateogrySchema = mongoose.Schema({
    Name:{
        type:String,
        require:true,        
    },
    ImagePath:{
        type:String
    },
    Description:{
        type:String
    },
    CreatedOn:{
        type:Data,
        default:Date.UTC
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

});