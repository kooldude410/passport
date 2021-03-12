const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password);
        return user ?
            done(null, user) :
            done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    }
);

const GitHubStrategy = require('passport-github').Strategy;
const userModel = require("../models/userModel").userModel;

passport.use(new GitHubStrategy({
        clientID: "8052b882d217ef703d4c",
        clientSecret: "be5707b4d46a32520a74b88bcf33f6a0fafd081f",
        callbackURL: "http://localhost:8000/auth/github/callback",
    },
    function(accessToken, refreshToken, profile) {

        userModel.findOne({ "githubId": profile.id }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'github',

                    github: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });

    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin);