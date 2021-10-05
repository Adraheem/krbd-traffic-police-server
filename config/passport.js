const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// connect to database
const con = require("./connection");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      con.release;
      con.connect((err) => {
        if (err) throw err;

        con.query(
          `SELECT id FROM admin WHERE id="${jwt_payload.id}"`,
          (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
              return done(null, result[0]);
            }
            return done(null, false);
          }
        );
      });
    })
  );
};
