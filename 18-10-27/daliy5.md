### 定时器
    - 调用函数的类型
        1. 直接调用fn();
        2. 时间调用ele.onclick = function () {};
        3. 定时器调用函数
1. setTimeout(function(){},延迟时间,第一个函数的参数)
    - 三个参数
        1. 第一个：callback(钩子函数),当某个“事件”(当某个条件成立触发的函数)
        2. 第二个：延迟的时间，按毫秒计算
        3. 第三个：钩子函数的实参
    - 指定时间只触发一次函数
- 返回值：number类型的数字，这个数字，每添加一个定时器就会加1，这个返回值会一直在计算机中存储，就算关闭定时器也存储
2. 关闭定时器; clearTimeout(定时器的编号)

### 循环定时器
- setInterval(callback,时间,钩子函数的参数)
    - 每隔一段时间就执行一次代码，只要不关闭就不断执行
    - 三个参数
        1. 第一个：callback(钩子函数),当某个“事件”(当某个条件成立触发的函数)
        2. 第二个：延迟的时间，按毫秒计算
        3. 第三个：钩子函数的实参
    - alert还可以阻塞代码
- 返回值：number类型的数字，这个数字，每添加一个定时器就会加1，这个返回值会一直在计算机中存储，就算关闭定时器也存储
- 关闭定时器：
    1. clearInterval
    2. clearTimeout
### 时间对象
- new Date() 获取当前用户的本地时间（用户的本地时间是不可靠的）
    - 在真正的开发中，要获取服务器的时间
- 时间戳：1970年01月01日00时00分00秒到当前时间
    - new Date().getTime();时num类型的
    - Date.now()
    - +new Date
- 下面获取的时间都是数字类型
- let t = new Date();
    - 获取当前的年份 t.getFullYear()
    - 获取当前的月份 t.getMonth()获取来得值都会少一月份，所以要加一
    - 获取当前的日 t.getDate()
    - 获取当前的周 t.getDay() 周日是0
    - 获取当前的时 t.getHours()
    - 获取当前的分 t.getMinutes()
    - 获取当前的秒 t.getSeconds()

### 倒计时
- 倒计时原理
    1. 未来的时间
    2. 现在的时间（每分每秒都在动）
    - 未来的时间 - 现在的时间 = 剩下的时间
    - new Date(工作时这儿放服务器时间)
- 设置的时间
    1. new Date('2018 10 27 15:40:00')（字符串时间）
    2. new Date(2018,9,27,15,40,00)
```javascript
let newDate = new Date('2018 10 28 16:00:00');
let timer = setInterval(function() {
    let nowDate = new Date; //（现在的时间）
    let t = (newDate - nowDate) / 1000;
    //86400 3600 60 
    let d = Math.floor(t/86400);
    t %= 86400;
    let h = Math.floor(t/3600);
    t %= 3600;
    let m = Math.floor(t/60);
    t %= 60;
    console.log(d + '天' + h + '时' + m + '分' + Math.floor(t) + '秒');
},1000)
```
- 匿名函数自执行的this就是window