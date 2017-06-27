// 模板引擎
var express = require('express');
var app = express();
var port = 7113;
app.locals.des = 'this is 本地变量'

app.set('views','./jade');
app.set('view engine','jade');
app.set('trust proxy',true);

app.get('/',function(req, res){
    res.render('index',{title: 'Hey', message: 'Hello World', name:'wuzi', email:'549243104@qq', user:{id: 12}})
    // console.log('1-------',app.locals)
    // console.log(app.mountpath)
    // console.log('2-------',req)
    // console.log('3-------',res)
    // console.log('123')
})

app.listen(port,function(){
    console.log('serve listening at localhost:', port)
})