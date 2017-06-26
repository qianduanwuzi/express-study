var express = require('express');
var app = express();

var cb0 = function(req,res,next){
    console.log('cb0 before');
    next();
    console.log('cb0 after')
}

var cb1 = function(req,res,next){
    console.log('cb1 before');
    next();
    console.log('cb1 after');
}

var cb2 = function(req,res,next){
    res.send('Hello')
}

app.get('/test',[cb0,cb1,cb2]) //

app.get('/user',function(req,res){
    res.send('Hello World')
})

//链式路由句柄
app.route('/lianshi')
    .get(function(rrq,res){

    })
    .post(function(){

    })
    .put(function(){

    })

var server = app.listen(7112, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('serve listening at',host,port)
})