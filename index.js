let express=require('express');
let cors=require('cors');
let bodyParser=require('body-parser');
let app=express();
let path=require('path');
let passport=require('passport');
let LocalStrategy=require('passport-local').Strategy;
let session=require('express-session');

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({'secret':'thisislameisthislame?'}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/',function (req, res) {
    res.render('index.ejs');
});
app.get('/attendsel',function (req, res) {
    res.render('attendance_sel.ejs');
});
app.get('/attendance',function (req, res) {
    res.render('attendance.ejs');
});
app.get('/home',function (req, res) {
    res.render('dashboard.ejs');
});
app.post('/signup',function(req,res){
    console.log('post request recieved !');

    let username=req.body.username;

});
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        // usernameField : 'email',
        // passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({username}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }
));
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
let port=process.env.PORT||'3000';
app.listen(port,function () {
    if(port==='3000')
        console.log('server started at port 3000 !');
    else
        console.log('prod server started !');
});