// 模板引擎
var express = require('express');
var app = express();
var port = 7113

app.set('views','./jade');
app.set('view engine','jade');

app.get('/',function(req, res){
    res.render('index',{title: 'Hey', message: 'Hello World', name:'wuzi', email:'549243104@qq', user:{id: 12}})
})

app.listen(port,function(){
    console.log('serve listening at localhost:', port)
})