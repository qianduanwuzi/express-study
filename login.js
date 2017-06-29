// 模拟login
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.set('port',1234);
// 指定视图目录
app.set('views','./public/views');
// 缓存视图
app.set('view cache',true);
// 设置引擎视图
app.set('view engine','ejs');

app.use(express.static(__dirname+'/public'));
//post方式提交数据解析
app.use(bodyParser.urlencoded({ extended: true }));
// 解析cookie
app.use(cookieParser());
// 根据cookie获取内存中的session
app.use(session({
    secret: 'wuzi_login_demo', //一个String类型的字符串，作为服务器端生成session的签名。
    // name: 'keyname', 返回客户端的key的名称，默认为connect.sid
    cookie: {secure: false, maxAge: 30*60*1000},
    resave: true,
    saveUninitialized:true
}));

//自定义中间件，用于判断用户是否登录和能否登录
app.use(function(req, res, next){
    if(req.session.user){ //如果登陆过
        next()
    }else{ //没登录过
        //登录页面登录
        var name = req.body.name;
        var pwd = req.body.pwd;
        var noLogin = req.body.noLogin;
        var cookies = req.cookies; //直接跳过登录页面访问（曾经有登录过）
        if((name == 'wuzi' && pwd == '1234') || (cookies.name == 'wuzi' && cookies.pwd == '1234')){
            console.log('=====2=====')
            //当用户端勾选免登录
            if(noLogin == 'on'){
                res.cookie('name',name,{maxAge: 30*60*1000});
                res.cookie('pwd',pwd,{maxAge: 30*60*1000});
            }
            req.session.user = {name:name,pwd:pwd};
            next()
        }else{
            console.log('=======3=======');
            res.set('content-type','text/html');
            res.status(200).sendFile(__dirname+'/public/html/login.html'); //必须绝对路劲
        }
    }
})

app.post('/success',function(req, res){
    res.send('login success')
})

app.listen(app.get('port'),function(){
    console.log('login is listening at:'+app.get('port'))
})




