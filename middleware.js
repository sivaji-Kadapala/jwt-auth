//27importing the JWT
const jwt = require('jsonwebtoken');
//28.exporting one type of module ,
module.exports = function(req, res, next) {
    try{
        //30.Token are send in headers
        let token = req.header('x-token');
        if(!token){
            //Token are not matching ,then it will be giving the error
            return res.status(400).send('Token Not found');
        }
        //31.it checks the token
        let decode = jwt.verify(token,'jwtSecret');
        //32.decode.user is one more object,it is passd to the arrow function
        req.user = decode.user
        //33.then goto the server.js
        next();
    }
    //29.verifying the tokentoken is handle for middleware JWT
    catch(err){
        console.log(err);
        return res.status(500).send('Invalid token')
    }
}