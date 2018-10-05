const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');

const { Good, Auction, User, sequelize } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
/**
 * 해당라우터에 공통사항을 지정
 */
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
/**
 * 메인 페이지
 */
router.get('/', async (req, res, next) => {
  try {
    const goods = await Good.findAll({ where: { soldId: null } });
    res.render('main', {
      title: 'NodeAuction',
      goods,
      loginError: req.flash('loginError'),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 회원가입 페이지
 */
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeAuction',
    joinError: req.flash('joinError'),
  });
});

/**
 * 상품등록 페이지
 */
router.get('/good', isLoggedIn, (req, res) => {
  res.render('good', { title: '상품 등록 - NodeAuction' });
});

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
/**
 * 상품저장 페이지
 * 상품등록 시간으로부터 24시간 후로 scheduleJob 추가
 */
router.post('/good', isLoggedIn, upload.single('img'), async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      ownerId: req.user.id,
      name,
      end: req.body.end,
      img: req.file.filename,
      price,
    });
    const end = new Date();
    // end.setDate(end.getDate() + 1); //24시간 뒤로 종료시간 설정
    // end.setMinutes(end.getMinutes()+3); //3분뒤 종료
    end.setHours(end.getHours() + good.end); //시간단위로 파라메터를 받아서 처리하므로 시간단위로 변경
    //서버 메모리에 스케쥴 저장
    schedule.scheduleJob(end, async () => {
      const success = await Auction.find({ //입찰금액을 내림차순으로 정렬해서 가장 마지막 입찰ID를 가져옴
        where: { goodId: good.id },
        order: [['bid', 'DESC']],
      });
      if(success) { // 낙찰자가 있으면
        await Good.update({soldId: success.userId}, {where: {id: good.id}}); //상품에 낙찰자 아이디 업데이트
        await User.update({ //입찰자의 보유금액 - 낙찰금액
          money: sequelize.literal(`money - ${success.bid}`),
        }, {
          where: {id: success.userId}
        });
      } else { // 낙찰자가 없으면
        await Good.update({ soldId: good.ownerId }, { where: { id: good.id } }); //상품등록자에게 돌려줌
      }
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/**
 * 상품정보와 경매내역을 auction.pug로 전달하고 렌더링함
 */
router.get('/good/:id', isLoggedIn, async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.find({
        where: { id: req.params.id },
        include: {
          model: User,
          as: 'owner',
        },
      }),
      Auction.findAll({
        where: { goodId: req.params.id },
        include: { model: User },
        order: [['bid', 'ASC']],
      }),
    ]);
    res.render('auction', {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
      auctionError: req.flash('auctionError'),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 입찰 라우터
 */
router.post('/good/:id/bid', isLoggedIn, async (req, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.find({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    if (good.price > bid) { // 시작 가격보다 낮게 입찰하면
      return res.status(403).send('시작 가격보다 높게 입찰해야 합니다.');
    }
    // 경매 종료 시간이 지났으면
    if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
      return res.status(403).send('경매가 이미 종료되었습니다');
    }
    // 직전 입찰가와 현재 입찰가 비교
    if (good.auctions[0] && good.auctions[0].bid >= bid) {
      return res.status(403).send('이전 입찰가보다 높아야 합니다');
    }
    if(good.ownerId === req.user.id) {
      return res.status(403).send('경매 등록자는 입찰할 수 없습니다');
    }
    const result = await Auction.create({
      bid,
      msg,
      userId: req.user.id,
      goodId: req.params.id,
    });
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**
 * 낙찰 내역 보는 라우터
 */
router.get('/list', isLoggedIn, async (req, res, next) => {
  try {
    const goods = await Good.findAll({
      where: { soldId: req.user.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    res.render('list', { title: '낙찰 목록 - NodeAuction', goods });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
