var express = require('express');
var app = express();
var port = 7333;
var Busboy = require('busboy');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.post('/fileupload', function (req, res) {
    // 通过请求头信息创建busboy对象
    var busboy = new Busboy({ headers: req.headers });

    // 将流链接到busboy对象
    req.pipe(busboy);

    // 监听file事件获取文件（字段名，文件，文件名，传输，mime类型）
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('filename: ' + filename)
        var writeStream = fs.createWriteStream('./upload/' + filename);

        //读取数据
        file.on('data', function (data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            // 写入数据
            writeStream.write(data);
        });

        file.on('end', function () {
            console.log('File [' + fieldname + '] Finished');
            // 关闭写入流
            writeStream.end();
        })
    });

    // busboy.on('filed',function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype ){
    //     console.log('--')
    // });

    busboy.on('finish', function () {
        console.log('form解析完成');
        res.writeHead(303, { Connection: 'close', Location: 'http://www.baidu.com/' });
        res.end();
    })

// ---------------------------------------------------官方写法   START--------------------------------------------------------------------------------- 
    // var busboy = new Busboy({ headers: req.headers });
    // busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    //     // var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
    //     file.pipe(fs.createWriteStream('upload' + filename));
    // });
    // busboy.on('finish', function () {
    //     res.writeHead(200, { 'Connection': 'close' });
    //     res.end("That's all folks!");
    // });
    // return req.pipe(busboy);

// ---------------------------------------------------官方写法   END--------------------------------------------------------------------------------- 
})

app.listen(port, function () {
    console.log('上传listening at:' + port)
})