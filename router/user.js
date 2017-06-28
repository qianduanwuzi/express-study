var express = require('express');
// var app = express();
var user = express.Router();
// var port = 7188;

user.get('login',function(req, res, next){
    res.send('登录成功');
    res.end()
})

user.get('logout',function(req, res, next){
    res.send('登出成功');
    res.end()
})



// user.listen(port,function(){
//     console.log('user-server listening at'+port)
// })