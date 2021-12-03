const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.render('error',{errorMessage:'Permission denied'});
    try{
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    }catch(e){
        console.log(e);
        res.render('error',{errorMessage:'Failed to validate login.'});
    }

}