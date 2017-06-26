// 利用express.Router()创建路由模块
var express = require('express')
var router = express.Router()

router.use(function timeLog(req,res,next){
    console.log('Time:',Date.now())
    next()
})

router.get('/home',function(req,res){
    console.log('/home')
    res.send('Birds home')
})

router.get('/about',function(req,res){
    res.send('About Birds')
})

module.exports = router;

