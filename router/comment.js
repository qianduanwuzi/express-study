var express = require('express');
var comment = express.Router();
var fs = require('fs');

comment.get('/list',function(req, res){
    var data = fs.readFileSync('comment.json','utf-8')+'';
    var jsData = JSON.parse(data);
    res.render('list',{commentData:jsData})
})

module.exports = comment;
