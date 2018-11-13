### 作用域
```javascript
// var的变量 和 函数名会提升到上面，附上对应的值
// var a = undefined;
// var a = function a() {};
console.log(a); => a()
var a = 1;
function a() {};
console.log(a); => 1
```

```javascript
console.log(fn);// alert(4)
var fn = 10;
function fn () {alert(1)};
console.log(fn);//10
var fn = 20;
console.log(fn);//20
var fn = function () {alert(2)};
console.log(fn);//alert(2)
var fn = function () {alett(3)};
function fn () {alert(4)};
console.log(fn);//alert(3)
```

```javascript
console.log(fn);                    //首先变量提升
fn();                               //先是var
var fn = 20;                        //var fn = undefined;
console.log(fn);                    //var fn = function () {alert(3);};
var fn = function () {alert(3);}    //var fn = 10;
fn();                               //在var中最终留下了
function fn () {alert(2);}          //var fn = function () {alert(3);};
console.log(fn);                    //然后函数
function fn () {alert(1);}          //var fn = function () {alert(2);};
console.log(fn);                    //var fn = function () {alert(1);};
fn();                               //在函数中留下了
var fn = 10;                        //var fn = function () {alert(1);};(最后出现的函数)
console.log(fn);                    //然后在var的变量与重名函数中留下了
fn();                               //var fn = function () {alert(1);};
                                    //(并不是按这个var和函数的先后顺序进行的，只是单独比较比较明显，基本上同名的var中和同                                   名的函数中留下最后一个，然后留下函数)
                                    //逐行解读 只对“=”有反应
                                    //console.log(fn); => {alert(1);}
                                    //fn() => {alert(1);}
                                    //console.log(fn) => 20
                                    //fn() => {alert(3);}
                                    //console.log(fn) => {alert(3);}
                                    //console.log(fn) => {alert(3);}
                                    //fn() => {alert(3);}
                                    //console.log(fn) => 10
                                    //fn() => 此时fn为10，不是函数无法执行会报错
```

### 变量和window属性
```javascript
console.dir(window); // aa = 10 打印出的window是解析过后的
console.log(aa); // undefined 找的是变量aa，他会预解析（预解析附上的undefined）
console.log(window.aa); //undefined 对象上的一个属性，没有就是undefined
var aa = 10;// 只有赋值后才会给window加上属性
```

```javascript
var a = b = 3; // => var a = 3; b = 3;
console.log(a, b);//3,3
function fn () {
    console.log(a, b);//undefined,3 => var 变量提升a = undefined b没有var声明 就去外面找 此时b = 3
    var a = 5;
    b = 6;
    console.log(a, b);//5,6
}
fn();
console.log(a, b);//3,6 => 之前的var a = 5;是在函数内的私有变量，与外部无关，但是函数里面的b就是外面的b座椅被更改了
```

### 局部作用域
```javascript                                           
console.log(fn);//fn = function(){}                     // 变量提升
var a = 5;                                              // a = undefined; fn = function(){}
console.log(a);// 5                                         
var fn = 3;
function fn(){
    fn = 30;                                            //函数里面的变量提升
    console.log(fn); //30                               // var a = undefined fn = function fn(){alert(5);}
    var fn = function(){alert(1);};
    a = 50;
    console.log(fn,a); //function(){alert(1);},50
    function fn(){alert(5);}
    console.log(fn); //function(){alert(1);}
    var a = fn = 70;//自己的，外面的
    console.log(a,fn); //70,70 在函数里面var过fn所以此时赋值的fn是里面的fn和外面的无关，不会更改外面的值
    window.a = 80
} 
fn();//因为上面的函数在逐行解读的时候不会被解读，此时的fn为前面var的3，执行fn()会报错，此时为了练习忽略掉fn()，继续进行里面函数执行的操作
console.log(a,fn); //80,整个大的代码块
```

### 传参
```javascript
// 复合类型
var obj = {
        name:'小强'
    };
function fn(obj){ //没有var和函数，不进行内部的变量提升
    console.log(obj);//小强 里面没有var或着函数定义obj 此时的obj地址还是指向外面的obj
    obj = new Object();//重新赋址了一个新的obj，一个堆内存
    obj.name = '小明';//修改的是这个新的地址内的name
    console.log(obj); //小明
}
fn(obj);
console.log(obj); //小强 和函数内的name修改无关，他们在另外一个地址内

var obj = {
        name:'小强'
    };
function fn(obj){ //没有var和函数，不进行内部的变量提升
    console.log(obj);//小强 里面没有var或着函数定义obj 此时的obj找到了参数，参数的地址还是指向外面的obj
    obj.name = '小明';//修改的是外面obj地址内的name
    console.log(obj); //小明
}
fn(obj);
console.log(obj); //小明

var obj = {
        name:'小强'
    };
function fn(){ //没有var和函数，不进行内部的变量提升
    console.log(obj);//小强 里面没有var或着函数定义obj 此时的obj地址还是指向外面的obj
    obj.name = '小明';//修改的是这个新的地址内的name
    console.log(obj); //小明
}
fn(obj);
console.log(obj); //小明

//简单类型
var a = 20;
    function fn(a){                 //变量提升 a = undefined
        console.log(a);//30 此时a为undefined 所以去参数寻找值，找到附了值的a = 20，所以此时为20
        var a = 30;//重新var了一个私有变量
    }    
fn(a);
console.log(a);//20 在函数里面定义了一个私有变量a，里面的变化和外面的a无关，所以外面还是20

var a = 20;
    function fn(a){                 //没有变量提升
        console.log(a);//20 此时在函数里没有找到a的值，继续找到附了值的参数
        a = 30;
        console.log(a);//30 此时因为里面没有定义新的私有变量a，所以是对参数a进行了修改，并没有对外面的a进行修改
    }    
fn(a);
console.log(a);//20 a没有变化，函数中只是对参数a进行了改动

var a = 20;
    function fn(){                 //没有变量提升
        console.log(a);//20 此时在函数中没有找到a，项参数查找，也没有找到，再向外面查找，找到a为20
        a = 30;
        console.log(a);//30 此时因为里面没有定义新的私有变量a，所以是对外面的a进行了修改
    }    
fn(a);
console.log(a);//30 a有变化，函数中只是对a进行了改动
```