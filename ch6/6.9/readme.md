### view 템플릿 ejs로 express 패키지 만들기
```bash
express learn-express --view=pug
```
--view=pug
HTML대신에 Template엔진으로 pug를 사용하겠다는 옵션임

### ejs 문법

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <% include header.ejs %>
    <h1><%= title %></h1>
    <% for (i in ['사과', '배', '오렌지']) { %>
      <p>Welcome to <%= i %></p>
    <% } %>
    <% if (title === 'ejs') { %>
      <p>ejs 공부합시다.</p>
    <% } else { %>
      <p>pug 공부합시다.</p>
    <% } %>
    <% include footer.ejs %>
  </body>
</html>
```

`ejs`에서는 중복제거를 위한 `layout` 처리를 위해서 추가적인 라이브러리가 필요함

저자가 추천하기로는 `ejs`보다 `nunjucks` 엔진을 선호



### Template 엔진에 렌더링이 될 변수 선언

- 기존에 에러 메세지 입력 방식
```javascript
  res.render('error', { message: err.message, error: req.app.get('env') === 'development' ? err : {} });
```

- locals로 Template 엔진에 렌더링이 될 변수를 선언할 수 있음
다른 미들웨어에 선언해도 해당 변수를 사용할 수 있음
```javascript
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
```

### 전역변수 임시변수 req.app 사용예시
- express에서 변수들을 잠시 저장해둘 수 있음
- 변수들을 미들웨어 간에 공유할 수 있음
- app.set에 저장한 변수들은 라우터에서 사용할 수 없으므로 사용함
- 전역변수이므로 주의해서 사용

- 저장시 
```javascript
req.app.set('key','value')
```

- 사용시
```javascript
req.app.get('env')
```

- 임시 사용예시
객체의 속성을 이용
```javascript
app.user((req, res, next) => {
  req.password = 'freefront';
  next();
})

app.user((req, res, next) => {
  req.password; //freefront
})
```

### express.json()

```javascript
app.use(express.json());
```

- 아래와 같이 사용할수 있음
다른 기능을 추가할 수도 있으므로 아래와 같이 사용할 수도 있음
```javascript
app.use((req, res, next) => {
  console.log(req, res);
  req.password = 'freefront';
  express.json()(req, res, next);
});
```

### res.send res.sendFile res.json
res.render 도 많이 사용하지만
```javascript
res.render('index', { title: 'ejs', fruits: ['사과','배', '오렌지'] });
```

res.send(), res.sendFile(), res.json()을 많이 사용함
```javascript
res.send();
res.sendFile();
res.json({ hello: 'freefront' })
```