// 6/27
// wuzi
var express = require('express');
var app = express();
var birds = require('./birds.js')

app.use(function (req, res, next) {
    console.log('应用级中间件无挂载路径，应用的每个请求都会执行');
    next();
})

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

app.get('/', function (req, res, next) {
    res.send('Hello World');
    next()
})

app.get('/res', function (req, res) {
    // res.redirect('/')
    // res.json({ user: 'wuzi'})
    // res.status(500).json({mes:'error'})

})

//加载路由模块
app.use('/birds', birds)

//-------------------------------------------------------------start---------------------------
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/out', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
   next('route');
  // 否则将控制权交给栈中下一个中间件
//   else next(); 
}, function (req, res, next) {
    console.log('1')
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/out', function (req, res, next) {
    console.log('2')
});
//-------------------------------------------------------------end---------------------------
app.get('/haha',function(req, res, next){
    console.log('haha');
    res.send('haha')
})

app.use(function (req, res, next) {
    console.log('--end--');
    next();
})



app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send('Something broken')
})

var server = app.listen(7111, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(server.address())
    console.log('serve listening at', host, port)
})