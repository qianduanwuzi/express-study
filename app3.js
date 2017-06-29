var express = require('express');
var app = express();
var port = 7766;

app.get('/method', function (req, res) {
    res.set('key', 'value');
    res.append('date', '2017-6-29');
    // res.get('key')
    res, cookie('wuzi', 'gua66666', {
        domian: 'localhost',
        expires: new Date(),
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        secure: true, //是否加密传输https
        signed: false //内容加密
    });
    res.cookie('phone', '15112345678');
    // ---------------------------重定向------------------------------
        // res.status(302);
        // res.location('http://www.baidu.com/')

        // res.writeHead(302,{location:'http:www.baidu.com/'})

        // res.redirect(302,'http://www.baidu.com/')
    // ---------------------------------------------------------------
    res.write('hello world');
    res.json({"name":"wuzi","age":"25"});
    res.send() //只能写一次
})

app.get('/download',function(req, res){
    res.download('./download/新建文本文档.txt','abc.txt',function(err){
        if(err){
            console,log(err);
            res.sendFile('EXPRESS-STUDY/download/新建文本文档.txt')
        }
    })
})


app.listen(port, function () {
    console.log('serve listening at localhost:', port);
}) 