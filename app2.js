// 模板引擎
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var port = 7113;
app.locals.des = 'this is 本地变量';

// 静态文件处理中间件 only for 4.x 
app.use(express.static("public"));
//日志处理中间件
var logger = app.use(morgan('dev'));

var urlencodedParser = app.use(bodyparser.urlencoded({ extended: false }));

var jsonParser = app.use(bodyparser.json());

app.use(cookieParser('secret'));

// app.use(cookieSession({
//     name: 'username',
//     keys:['wuzi'],
//     secret: 'key1',
//     cookie:{
//         maxAge: 2*60*1000,
//         domian:'localhost',
//         secure: true
//     }
// }));



app.set('views', './jade');
app.set('view engine', 'jade');
app.set('trust proxy', true);

app.get('/request',function(req, res, next){
    console.log('baseUrl='+req.baseUrl);
    console.log('hostname='+req.hostname); // localhost 服务器主机名(域名)
    console.log('ip='+req.ip);
    console.log('path='+req.path); // /request 路由
    console.log('protocol='+req.protocol); // http 请求协议
    console.log('req.query=',req.query); // {} get方式请求参数
    console.log('req.route=',req.route);
    console.log('cookie=',req.cookies);// {} cookies
    res.send('request');
    res.end();
});

app.get('/cookie',function(req, res){
    console.log(req.signedCookies); // 签署过的cookie
    res.cookie ('pwd','1234',{signed: true});
    res.end()
})

// app.use(function (req, res, next) {
//     res.setHeader('Content-Type', 'text/html')
//     // res.write('you posted:\n')
//     next()
// })

// app.get('/login', jsonParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })


// app.use(function(req, res, next){
//     console.log('20----',req)
//     logger(req,res,function(err){
//         if(err) return err
//         res.setHeader('content-type', 'text/plain')
//         res.end();
//     })
//     next()
// })

app.get('/', function (req, res) {
    // logger(req,res,function(err){
    //     if(err) return err
    //     res.setHeader('content-type', 'text/plain')
    //     res.end()
    // })
    console.log('Cookies:', req.cookies);
    res.render('index', { title: 'Hey', message: 'Hello World', name: 'wuzi', email: '549243104@qq', user: { id: 12 } });
    // console.log('1-------',app.locals)
    // console.log(app.mountpath)
    // console.log('2-------',req)
    // console.log('3-------',res)
    // console.log('123')
})

app.all('/',function(req, res){
    console.log('-----pppppppp------');
    console.log(req.body);
    res.send();
    res.end();
})



app.listen(port, function () {
    console.log('serve listening at localhost:', port);
})