const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: ['email']}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login',
        }),
        function(req, res) {
        console.log(req.user);
        //if user in database => redirect to
            res.redirect('/');
        //if user not in database => register user and redirect to
        });

};
