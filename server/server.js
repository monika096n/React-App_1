const express = require('express');
const app = express();//server create
const cookieParser = require('cookie-parser')//session-maintanence
var cors = require('cors')

const config=require('./allConfig')
// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID=config.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const PORT = config.PORT;

//Encryption - Decryption
const bcrypt=require('bcrypt')
//Mongo
const { MongoClient } = require('mongodb');
const { reject } = require('bcrypt/promises');

// Middleware
app.set('view engine', 'ejs'); //views->ejs
app.use(cors());
app.use(express.json()); 
app.use(cookieParser()); //for setting cookie and removing

app.get('/', (req, res)=>{
    res.render('index') //renders a file
})

app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/login', (req,res)=>{
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();//email,name..etc
        console.log('payload',payload);
        const userid = payload['sub']; //email
      }
      verify() 
      .then(()=>{
          res.cookie('session-token', token); //setting cookie in users browser
          res.send('success')
      })
      .catch(console.error);

})

app.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', {user}); //sending user details to profile file
})

app.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected')
})

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}

let db;
MongoClient.connect(config.connectionString).then(val => {
db=val.db('React_app')
console.log('db',db)
let findUser=(username)=>{
  return new Promise((resolve,reject)=>{
    db.collection('user_details')
    .findOne({ username: username},function(err, result) {
      if (result!=null){
          resolve('Already exist')
      }
      else{
          resolve('Not Exist')
      }
      
  })
  })
}
app.post('/signUp', async (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let passwordHash = bcrypt.hashSync(password, 10);
    let existingUser=await findUser(username);
    console.log('login',existingUser)
    db.collection('user_details').insertOne({ username: username,password:passwordHash }, function (
        err,
        info
      ) {
        if (info!=null){     
            res.json({info})
        }
        else{
            res.json({status:'400',message:"Can't able to  register"})
        }
    })
})
app.post('/login-with-password', (req,res)=>{
    console.log('req details',req)
    let username = req.body.username;
    let password = req.body.password;
    db.collection('user_details')
      .findOne({ username: username},function(err, result) {
        if (result!=null){
            let resultPassword = result.password;
            let verified = bcrypt.compareSync(password, resultPassword);
            res.json({status:verified})
        }
        else{
            res.json({status:'400',message:'user not registered'})
        }
        
    })
})
}).catch(err=>{ 
    console.log(err)
  })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})