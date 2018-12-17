let http = require('http');
let fs = require('fs');
http.createServer((req,res)=>{
    let url = req.url;
    if(url.includes('?')){
        
    }else{
        if(url === '/')url = '/index.html';
        fs.readFile('../18-12-17_56' + url,(err,data)=>{
            if(err){
                // fs.readFile('../18-12-17_56/html.html',(err,data)=>{
                //     if(!err){
                //         res.write(data);
                //     }
                //     res.end();
                // });

                res.write(fs.readFileSync('../18-12-17_56/html.html'));
            }else{
                res.write(data);
            }
            res.end();
        });
    }
}).listen(80);