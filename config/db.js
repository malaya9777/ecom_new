const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://malayaAdmin:AWrairfqITBmkrej@cluster0.yw3xa.mongodb.net/Authentication?retryWrites=true&w=majority';

const initializeMongoServer = async ()=>{
    try{
        await mongoose.connect(mongoURL, {
            useNewUrlParser:true
        });
        console.log('Connected to DB!')
    }catch(e){
        console.log(e);
        throw e;
    }
}

module.exports = initializeMongoServer;