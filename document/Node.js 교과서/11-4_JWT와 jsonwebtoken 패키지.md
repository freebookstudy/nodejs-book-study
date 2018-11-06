## 토큰을 만들어주는 패키지 JWT
```bash
npm i jsonwebtoken
```

JWT 시크릿은 JWT 토큰 발급 및 인증에 사용되므로 잘 보관해야함
`.env`에 JWT_SECRET=jwtSecret 으로 토큰 생성

- 토큰 검증 모듈
> 유효하지 않을 때나(내가 만든 토큰이 아닐 때), 토큰 유효 기간이 만료되었을 때 에러가 발생
```javascript
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

//토큰 검증
const { verifyToken } = require('./middlewares');

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});
```

- 토큰 발급 모듈
```javascript
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');

const token = jwt.sign({
    id: domain.user.id,
    nick: domain.user.nick,
}, process.env.JWT_SECRET, {
    expiresIn: '1m', // 1분 1s - 1초, 1h - 1시간
    issuer: 'nodebird', //발급자
});
```

- 토큰 발급 API
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');
const router = express.Router();

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.find({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
      });
    }
    const token = jwt.sign({
      id: domain.user.id,
      nick: domain.user.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', // 1분
      issuer: 'nodebird',
    });
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});
```