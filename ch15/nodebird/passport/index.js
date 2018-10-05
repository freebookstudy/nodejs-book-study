const local = require('./localStretegy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');
// const user = {};

module.exports = (passport) => {
  // req.login 시 serializeUser를 수행 넘어온 user 정보를 받아온다
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    /*
    if(user[id]) {
      done(user[id]);
    }else {
      */
    User.find({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
        // .then(user => user[id] = user, done(null, user))
      .then(user => done(null, user))
      .catch(err => done(err));
    // }
  });
  local(passport);
  kakao(passport);
};