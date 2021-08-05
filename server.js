//1.importing express
const express = require('express');
//4.importing mongoose
const mongoose = require('mongoose');
//11.Now importing the model,this not a package
const Registeruser = require('./model');
//21.Login time ,we neeed token,thats why we importing the JWT
const jwt = require('jsonwebtoken');
//34.Now importing the middleware,go to the myprofile
const middleware = require('./middleware');
const cors = require('cors');
//2.intialize the express
const app = express();
//----------------------------------------------------------------------------

const PORT=process.env.PORT || 5000
//--------------------------------------------------------------------------



//5.configure the mongoose,mongoose are nosql
mongoose.connect("mongodb+srv://JWT:JWT@cluster0.zpsst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    //6.Deprications,these are passed in to the mongoose by second argument,next go the Model.js
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true
}).then(
    () => console.log('DB Connection established')
)
//13.it is used send the data in json format
app.use(express.json());

app.use(cors({origin:"*"}))
//------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------

//12For posting,it is asynchronous
app.post('/register',async (req, res) =>{
    //14.it handle the database errors(try and catch)
    try{
        //15.we are expecting values from user,they are four values
        const {username,email,password,confirmpassword} = req.body;
        //16.before storing email,whether it is existing or not,await handle the perticular delays in db,schema is Registeruser
        //its checks "new email and existing email"
        let exist = await Registeruser.findOne({email})
        if(exist){
            //17.it existing it respond the 400  error
            return res.status(400).send('User Already Exist')
        }
        //18,it will check the password and confirmpassword matching or not
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching');
        }
        //19.the person not present in db,then save in to the new person in db
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        //20.new user are saved into model
        await newUser.save();
        res.status(200).send('Registered Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})
app.get("/",(req,res) => {
    res.send("Memories API")
})
app.post('/login',async (req, res) => {
    try{//22.now  we need only two values
        const {email,password} = req.body;
       
        let exist = await Registeruser.findOne({email});
        if(!exist) {
            return res.status(400).send('User Not Found');
        }
        //23.it will be checks the existing(Registration time) password and now(Login) entered password (Login) matching or not
        if(exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        //26.payload is the id
        let payload = {
            user:{
                //27.exist.id-->existing  user id
                id : exist.id
            }
        }
        //24.email and password matches,then it will be going the logged,it is based on the token
        //Token is four types of arguments payload=object id,attribute key="this is for secure ,this is used in decoding time",expire time,arrow function-->it returns the token
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
          (err,token) =>{
              //25,if you have any error throwing the arror other wise return the response in json format
              if (err) throw err;
              return res.json({token})
          }  
            )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})
//26.It is protected router,we are not aceessing the without jwt token,protected  routers send the middleware,
//it is nothing but JWT,token is handle for middleware JWT,Go to the middleware.js
app.get('/myprofile',middleware,async(req, res)=>{
    try{
         //35.it is existing or not in db
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

//3
app.listen(PORT,()=>{
    console.log('Server running...')
})