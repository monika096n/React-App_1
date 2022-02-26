require('dotenv').config()

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const config=require('./allConfig')
// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID=config.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const PORT = config.PORT;

// Middleware

app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(cookieParser()); //for setting cookie and removing
app.use(express.static('public'));

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
        const payload = ticket.getPayload();
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


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})