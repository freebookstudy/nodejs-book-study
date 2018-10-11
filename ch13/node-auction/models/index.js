const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize); //사용자
db.Good = require('./good')(sequelize, Sequelize); //상품
db.Auction = require('./auction')(sequelize, Sequelize); //경매

db.User.hasMany(db.Auction); //입찰자가 다수의 자신의 입찰데이터를 생성
db.Auction.belongsTo(db.User); //입찰한 다수의 입찰데이터는 입찰자에 속함
db.Good.hasMany(db.Auction); //상품은 다수의 경매입찰 데이터를 가짐
db.Auction.belongsTo(db.Good); //다수의 입찰 데이터는 상품에 속함
// db.User.hasMany(db.Good); //등록자가 여러개 상품등록 (테이블에 userId 컬럼을 추가)
db.Good.belongsTo(db.User, { as: 'owner' }); //상품 등록자에 속한 상품 (good 테이블에 ownerId를 추가)
// db.User.hasMany(db.Good); //입찰자가 여러개의 상품을 낙찰 받음 (테이블에 userId 컬럼을 추가)
db.Good.belongsTo(db.User, { as: 'sold' }); //상품 낙찰자에 속한 상품 (good 테이블에 soldId를 추가)

module.exports = db;