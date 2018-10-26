### 变量提升补充
- 声明(declare)： var a (默认值为undefined)
- 定义(defined)： a = 12 (定义其实就是赋值操作)
- [变量提升阶段]
    - var的只声明未定义 //声明一个变量，但是没有赋值，可以看作只有一个var a;后面赋值签引用就会undefined
    - function声明并且定义（赋值）//声明一个函数 函数名 = 代码块,有重名的情况下，只是在附不同的值，只取最后附上的值
- 变量提升只发生在当前作用域（例如： 开始加载页面的时候只对全局作用域下的进行变量提升，因为此时函数存储的都是字符串而已）
- 在全局作用域下声明的函数或者变量时“全局变量”，同理，在私有作用域下声明的变量时“私有变量”[带var/function的才是声明]
- 匿名函数在全局作用域下不进行变量提升
#### 条件判断下的变量提升
    - 在当前作用域下不管条件是否成立都要（对里面的内容）进行变量提升。
        - 带var的还是只声明
        - 带function的在老版本浏览器渲染机制下，声明加定义都处理，但是为了迎合ES6中的块作用域，新版本作用域对于函数(在条件判断中的函数)，不管条件是否成立都只是先声明，没有定义，类似于var
```javascript
    console.log(a);         // undefined
    if ('a' in window) {
        var a = 100;
    }
    console.log(a);         //undefined
```
```javascript
    console.log(fn);        //undefined 变量提升，fn为undefined，他是在全局里面变量提升，只声明未定义
    if (1 == 1) {
        console.log(fn);    //函数本身,当条件成立，进入到判断体中，（ES6中它是一个块级作用域）第一件事情不是代码执行，而是类似于变量提升一样，先把fn的值附上，也就是判断体中代码执行之前，fn已经赋值了，更像是一个块级作用域但并不是完整的块级作用域
        function.fn() {
            console.log('OK');
        }
    }
    console.log(fn);        //函数本身
```

```javascript
    f = function () {return true;};             //变量提升阶段，无提升，匿名函数不进行变量提升
    g = function () {return false;};            
    ~function () {                              //私有作用域下变量提升 g() = undefined,此时的g()是函数内的私有函数，更改不会影响到外面（老版本中g()={return true}）
        if (g() && [] == ![]) {                 //g()为undefined执行报错，此时执行结束（老版本中，不会报错，g()返回true []==![]为true，语句执行）                
            f = function () {return false;};    //(老版本中,f()就是全局下的f(),它更改，影响全局下的f())    
            function g () {return true};        //（此条语句在逐条执行的时候不会执行第二遍)        
        }                                       
    } ();                                       
    console.log(f());//（fasle老版本中)                           
    console.log(g());//（fasle老版本中)
    //[] == ![]
        //他们两个比较是!优先级高先执行，取反要把[]先转换成布尔值true，再取反为false
        // [] == false 比较不同数据类型全部转换成num类型（null和undefined除外） 0 == 0 
        // 条件成立为true                      
```

### 作用域链
- 简介 从私有作用域开始查找，一级一级向外查找，直到找到window为止，这种查找机制叫做“作用域链”(没有var的时候，只有在赋值语句过后才会在window上产生这个属性)
```javascript
function fn() {
    console.log('b' in window); //false
    var a = 12;
    b = 13;
    console.log(a,b); //12,13
}
fn();
console.log(a,b); //报错，全局作用域下没有a这个变量，此时的b为13
```

### let不存在变量提升
- 在ES6中基于let/const等方式创建变量或函数，不存在变量提升机制
- 切断了全局变量和window的映射机制 
- 在相同相同作用域中，基于let不能声明相同名字的变量(不管用什么方式在当前作用域下声明了变量，再次使用let创建都会报错)
- 虽然没有变量提升机制，但是在当前作用域代码自上而下执行之前，浏览器会做一个重复性检测（语法检测），自上而下查找当前作用域下所有变量，一旦发现有重复的直接抛出异常，代码也不会执行了（虽然没有把变量提升声明定义，但是浏览器已经记住了，当前作用域下有哪些变量）

```javascript
b = 12;
console.log(b);//12
a = 12;
console.log(a);//Uncaught ReferenceError: a is not defined
let a = 13;
console.log(a);
```
```javascript
let a = 10,
    b = 10;
let fn = function () {
    console.log(a, b);  //报错，在当前作用域下，也就是函数这个私有作用域下，查重机制运行，发现下面有个let a;记住了，在这个作用域下有一个变量a了，在let之前调用，他没有赋值也没有声明，所以a not find，如果忽视这段代码，下面继续执行
    let a = b = 20;
    console.log(a, b); //20,20 此处a为私有作用域下的a和外面无关，b在这个私有作用域下没有定义，就去外面找，找到了let b = 10，这时b = 20附上值，改变了外面的b
};
fn();
console.log(a, b);//10,20
```
### js中的暂时性死区问题
```javascript
console.log(typeof a);//undefined 在原有浏览器渲染机制下，基于typeof等逻辑运算符检测一个未被声明过得变量，不会报错，返回undefined
```
- 基于ES6解决了暂时性死区问题
    - 如果当前变量时基于ES6语法处理，在没有声明这个变量的时候，使用typeof检测会直接报错，不会是undefined解决了原有的js的死区问题
```javascript
console.log(typeof a);//Uncaught ReferenceError: a is not defined
let a;
```

```javascript
var a = 12;
if (true) {
    console.log(a); //Uncaught ReferenceError: a is not defined
    let a = 13; //基于let创建的变量，会把大部分P{}当作一个私有块级作用域，（类似于函数的私有作用域），在这里也是重新检测语法规范，看一下是否是基于新语法创建的变量，如果是按照新语法规范来解析
}
```

### 全局变量和私有变量
- 函数执行会形成一个私有作用域，到私有作用域中的第一件事是形参赋值，第二件事是变量提升，第三件事逐行解读代码（函数执行时执行代码fn()，()中的是值，不是变量）

### 查找上级作用域
- 当前函数执行形成一个私有作用域，这个作用域的上级作用域是谁，和他在哪里执行没关系，和它在哪里创建的或者说定义的有关系，在哪里创建的，它的上级作用域就是谁
    - argument：实参集合
    - argument.caller：函数本身fn
    - argument.callee.caller：当前函数在哪里执行的caller就是谁（记录的是它执行的宿主环境，在全局下执行caller的结果是null）
```javascript
var n = 10;
function fn () {
    var n = 20;
    function f () {
        n++;
        console.log(n);
    }
    f();
    return f;
}
var x = fn();
x();
x();
console.log(n);
//结果是 21 22 23 10 => answerPicture1
```

### JS堆桟内存释放
- JS中的内存分为堆内存和栈内存
    - 堆内存存储引用数据类型值，（对象：键值对 函数：代码字符串）
    - 栈内存：提供JS代码执行环境和存储基本类型值
    -堆内存释放
        - 让所有引用堆内存空间地址的变量值为null即可（没有变量占用这个堆内存了，浏览器会在空闲的时候把它释放掉）
    - 栈内存释放
        - 一般情况下，当函数执行完成，所形成的私有作用域（栈内存），都会自动释放掉（在栈内存中存储的值也都会释放掉），但是也有特殊不销毁的情况
            1. 函数执行完成，当前形成的栈内存中，某些内容被栈内存以外的变量占用了，此时栈内存不能释放（一但释放外面找不到原有的内容了）
            2. 全局栈内存只有在页面关闭的时候才会被释放掉
        - 如果当前栈内存没有被释放，那么之前在班内存中存储的值也不会释放，能够一直保存下来

```javascript
var i = 1;
function fn(i) {
    return function (n) {
        console.log(n + ++i);
    }
}
var f = fn(2);
f(3);
fn(5) (6);
fn(7) (8);
f(4);
//6 12 16 8 => answerPicture2
```

### 闭包之保护
- 函数执行形成一个私有作用域，保护里面的私有变量不受外界干扰，这种保护机制称之为"闭包" => 市面上的开发者认为的"闭包"，形成一个不销毁的私有作用域（私有栈内存）才是"闭包"
```javascript
function fn () {
    return function () {

    }
}
var f = fn();
// 柯理化函数=> 他们认为这才是闭包

var utils = (function ()) {
    return {

    }
}) ();
//惰性函数 => 她 们认为这才是闭包
```
- 真实项目中为了保证js的性能（对战内存的性能优化），应该尽可能的减少必报的使用（不销毁的堆栈内存是耗性能的）
- 闭包有什么作用
    1. 保护机制 保护自己私有变量不受外界干扰 在真实项目中，尤其是团队协作开发的时候，应当尽可能减少全局变量的使用，以防止相互之间冲突（“全局变量污染”），那么此时我们完全可以把自己这一部分内容封装到一个闭包中，让全局变量转换为私有变量
```javascript
(function () {
    var n = 12;
    function fn () {

    }
    //...
}) ();
```
    - 不仅如此，我们封装类库插件的时候，也会把自己的程序存放到闭包中保护起来，防止和用户的程序冲突，但是我们有需要暴露一些方法给用户使用，这样我们如何处理
        1. JQ这种方式：把需要暴露的方法抛到全局
```javascript
(function () {
    function jQuery(){
        //...
    }
    //...
    window.jQuery = window.$ = jQuery;//把需要供外面使用的方法，用过给window设置属性的方式暴露出来
})();
// jQuery();
//$();
```
        2. Zepto这种方式：加删除return那需要供外面使用的方法暴露出来
```javascript
var Zepto = (function () {
    //...
    return {
        xxx:function () {

        }
    };
})();
//Zepto.xxx();
```
    2. 保存机制 形成一个不销毁的栈内存，把里面的一些值保存起来，方便后面使用

### 闭包之保存
- 在传统的ES规范中 只有函数产生的私有作用域和全局作用域 if for 不产生作用域 
- 页面加载完成，js代码已经加载完了，也就是循环也都执行完成了
- 所有的事件绑定都是异步编程，绑定意见后，不需要等待执行，继续执行下一个循环任务，佛印当我们点击执行方法的时候，循环早已经结束
    1. 同步编程：一件事一件事的做，当前这件事没完成，下一个任务不能处理
    2. 异步编程：当前这件事没有彻底完成，不再等待，继续执行下面的任务

### const命令
- const声明一个只读的常量，一旦声明，常量的值就不能更改，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值
- 对于const来说，只声明不赋值就会报错
- const的作用域与let命令相同：只在声明所在的块级作用域内有效，const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
- 与let一样不可以重复声明
- 对于复合类型的常量，变量名不知想数据，而是指向数据所在的地址，const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量时必须非常小心
```javascript
const obj = {name:a,age:12};
obj.age = 13;
console.log(obj);
```

- 如果真的想将对象冻结，应该使用Object.freeze方法
```javascript
const foo = Object.freeze({});
//常规模式下，下面一行不起作用
//严格模式下，该行会报错
foo.prop = 123;
```

- 除了将对象本身冻结，对象的属性也应该冻结，下面是一个将对象彻底冻结的函数
```javascript
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key,value) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
};
```