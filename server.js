//vaiables
var express = require('express');
var bodyParser = require('body-parser');
var mustache = require('mustache-express');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
var session = require('express-session');
var dal = require('./dal');

var app = express();

//register mustache-express
app.engine('mustache', mustache());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//serve static file
app.use(express.static('public'));

//
app.use(
  session({
    secret: 'lotusflowerbomb',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: null
    }
  })
)

app.use(function(req, res, next) {

  if (req.session.usr) {
    req.isAuthenticated = true
  } else {
    req.isAuthenticated = false
  }
  console.log(req.isAuthenticated);
  next()
})


//routes
app.get('/', function(req, res) {
  if (req.isAuthorized) {
    res.render('welcome', {
      name: (req.session.usr)
    })
  } else {
    res.redirect("login")
  }
})

app.get('/admin', function(req, res) {
  if (req.isAuthenticated) {
    const users = dal.getUsers()
    res.render('admin', {
      users: users,
      loggedUsr: req.session.usr
    })
  } else {
    res.redirect('login')
  }
})

app.get('/login', function(req, res) {
  res.render('login')
});

app.post('/login', function(req, res) {
  const sesh = req.session
  const foundUsr = dal.getUserbyUsername(req.body.username)
  if (req.body.password === foundUsr.password){
    sesh.usr = {name: foundUsr.name}
    res.redirect('welcome')
  }else{
    res.send('To bad so sad!')
  }
})

app.get('/welcome', function(req, res){
  res.render('welcome')
})

app.get('/logout', function(req, res) {
  req.session.destroy()
  res.redirect('login')

});

app.listen(3000, function() {
  console.log('Port 3000 has started');
})
