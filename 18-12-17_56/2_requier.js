// let obj = require('./1_model');
// console.log(obj.a);

let http = require('http');
http.createServer((req,res)=>{
    let name = req.url.split('=')[1];
    let cb = req.url.split('=')[4];
    switch(name){
        case 'xyz':
            res.write('{code:0,msg:chy}');
        break;
        case 'hongdan':
            res.write('{code:0,msg:cmy}');
        break;
        default:
            res.write('{code:0,msg:cyy}');
        break;
    }
    res.end();
}).listen(80);