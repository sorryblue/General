let http = require('http');
let aaa = require('./2').aaa;//let {aaa} = require('./2);
//console.log(aaa);
let fs = require('fs');
let qs = require('querystring');
let sql = [
    {
        name:'ser',
        age:18
    },
    {
        name:'wyf',
        age:16
    },
    {
        name:'ddd',
        age:15
    }
]
http.createServer((req,res)=>{
    let url = req.url;
    if(url.includes('/user')){
        //接口
        let u = url.match(/\/([a-z]+)\?/)[1];
        let obj = qs.parse(url.split('?')[1]);
        let obj2 = sql.find(e=>{obj.name === e.name});
        if(obj.name && obj.age){
            res.write(200,{'Content-Type':'text/html;charset=utf-8'});
            switch(u){
                case 'login':
                    if(obj2){
                        if(obj2.age == obj.age){
                            res.write('{code:0,msg:"登录成功"}');
                        }else{
                            res.write('{code:2,msg:"用户名或密码错误"}');
                        }
                    }else{
                        res.write('{code:1,msg:"用户不存在"}');
                    }
                break;
            }
            res.end();
        }else{
            res.write(400,{'Content-Type':'text/html;charset=utf-8'});
        }
    }else{
        //静态文件
        if(url == '/')url = '/index.html';
        let data = '';
        try{
            data =  fs.readFileSync('./www' + url);
        }catch (error){
            data =  fs.readFileSync('./www' + '/404.html');
        }finally{
            res.write(data);
            res.end();
        }
    }
}).listen(80);