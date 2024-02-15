const path = require('path'); 

module.exports.home=function(req,res){
    // res.sendFile(path.join(__dirname, '../client/tiffen/build/index.html'));
}

module.exports.About=function(req,res){
    res.sendFile(path.join(__dirname, '../client/tiffen/build/index.html'));
}