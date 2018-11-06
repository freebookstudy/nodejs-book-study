## Express4 변경점 링크
http://expressjs.com/ko/guide/migrating-4.html

## Express3의 미들웨어 및 그에 대응 하는 Express4의 미들웨어

Express 4는 더 이상 Connect에 종속되지 않으며, express.static 함수를 제외한 모든 기본 제공 미들웨어가 Express 4 코어에서 제거되었습니다. 따라서 Express는 이제 독립적인 라우팅 및 미들웨어 웹 프레임워크가 되었으며, Express 버전화 및 릴리스는 미들웨어 업데이트의 영향을 받지 않게 되었습니다.

기본 제공 미들웨어가 없으므로 사용자는 앱을 실행하는 데 필요한 모든 미들웨어를 명시적으로 추가해야 합니다. 이를 위해서는 다음 단계를 따르기만 하면 됩니다.

모듈 설치: npm install --save <module-name>
앱 내에서, 모듈 요청: require('module-name')
해당 모듈의 문서에 따라 모듈 사용: app.use( ... )
다음 표에는 Express 3의 미들웨어 및 그에 대응하는 Express 4의 미들웨어가 나열되어 있습니다.

| Express 3                | Express 4                                                    |
| ------------------------ | ------------------------------------------------------------ |
| `express.bodyParser`     | [body-parser](https://github.com/expressjs/body-parser) + [multer](https://github.com/expressjs/multer) |
| `express.compress`       | [compression](https://github.com/expressjs/compression)      |
| `express.cookieSession`  | [cookie-session](https://github.com/expressjs/cookie-session) |
| `express.cookieParser`   | [cookie-parser](https://github.com/expressjs/cookie-parser)  |
| `express.logger`         | [morgan](https://github.com/expressjs/morgan)                |
| `express.session`        | [express-session](https://github.com/expressjs/session)      |
| `express.favicon`        | [serve-favicon](https://github.com/expressjs/serve-favicon)  |
| `express.responseTime`   | [response-time](https://github.com/expressjs/response-time)  |
| `express.errorHandler`   | [errorhandler](https://github.com/expressjs/errorhandler)    |
| `express.methodOverride` | [method-override](https://github.com/expressjs/method-override) |
| `express.timeout`        | [connect-timeout](https://github.com/expressjs/timeout)      |
| `express.vhost`          | [vhost](https://github.com/expressjs/vhost)                  |
| `express.csrf`           | [csurf](https://github.com/expressjs/csurf)                  |
| `express.directory`      | [serve-index](https://github.com/expressjs/serve-index)      |
| `express.static`         | [serve-static](https://github.com/expressjs/serve-static)    |


## Express4 Setting Example
- package.json
```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
```

- app.js
```javascript
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```