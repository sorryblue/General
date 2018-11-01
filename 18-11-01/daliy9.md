### 面向对象 VS 面向过程
- 在写面向对象是的时候，尽量让方法中的this指向实例
- 只要遇到function 就要小心this有可能会变

### 改变this的方法
- 在创建函数的时候，函数自身有一些属性和方法，其中，有apply call bind 方法，这些放方法都是能够改变this指向的
- call：有无数个参数
    - 第一个参数： 
        - 能够改变this，基本上是写啥是啥（null、undefined写了还是window）
        ```javascript
        function fn (a,b,c,d){
            console,log(this);
            console.log(a + b + c + d)
        }
        fn.call();
        fn.call(document,1,2,3,4)
        fn.apply(document,[1,2,3,4])
        let f = fn.bind(document);
        f(1,2,3,4);
        fn.bind(document)(1,2,3,4);//这种和上面f(1,2,3,4)的结果是一样的
        fn.bind(document,1,2,3,4)();
        ```
    - 第二个参数之后
        - 就是实参（有几个形参就对应几个实参）
- apply: 只有两个参数
    - 第一个参数：
        - 能够改变this，基本上是写啥是啥（null、undefined写了还是window）
    - 第二个参数:（数组内放置的就是实参）
        - 数组[]
**上面两个方法都是使用之后自动调用函数**
- bind: 调用了方法，不会直接执行函数，他会有一个返回值，返回值为新的函数（改变了this之后的函数）
    - 若干参数：
        - 第一个参数：
            - 能够改变this，基本上是写啥是啥（null、undefined写了还是window）
        - 第二个参数之后：
            - 就是实参（有几个形参就对应几个实参）

### this
1. window
    - 函数直接执行（非箭头函数）
    - 匿名函数自执行
    - 定时器里面的this
    - 箭头函数（ES6中新添加的函数表达式）(let fn = (a,b) => {执行的语句}    let fn = (a) => a+1||let fn = a => a+1(直接箭头不加大括号，就等同于return，只能有一行代码,加大括号的目的是写多行代码,如果没有参数必须写括号))
        - 箭头函数直接暴露在window中
        - 箭头函数里的this指向当前函数的上一级
    ```javascript
    function fn (){
        console.log(this);
    }
    fn();
    ~(function(){console.log(this);)()
    setTimeout(function(){
        console.log(this);
    },1000)
    let fn = () => {}
    ```
2. 事件触发的元素
    - 事件函数（不能是箭头函数）被触发的时候，事件函数内的this，指向事件元素
3. 实例
    - 实例的this就指向实例（return实例）
    ```javascript
    function Fn(){
        this.a = 10;
        console.log(this);//构造函数的实例
        return {};
    }
    let f = new Fn();
    console.log(f.a);//undefined就是{}的a不存在，但是构造函数里面的this还是指向的实例
    ```
4. undefined
    - 严格模式
    ```javascript
    function fn(){
        'use strict'
        console.log(this);
    }
    fn();
    ```
    - `'use strict'` 声明变量必须使用var或者let等，arguments不和形参相映射，this指向undefined（delete可以删除对象中的属性）
    - 对象的this
        - 就是方法名.前面的

### let不与window相映射

### 继承
- 面向对象：
    - 三大特征：
        - 抽象、封装、继承、多态
- 继承：子类拥有父类的属性或者方法，自己也有自己的一套属性和方法
    - 类式(call)继承
    - 拷贝继承
    - 原型继承
    - 寄生式组合式继承
- 面向对象的写法：
    - 原型挂在类上，方法挂在类的原型下
- 面向对象继承：
    - 属性使用类式继承
    - 方法使用原型继承

### 类式继承
- 调用父类，通过call来改变this（把子类的this传给window），达到属性继承的目的
- 一般类式继承是继承属性
```javascript
function Coder(name,age,job){
    Person.call(this,name,age);
}
```

### 拷贝继承
- 浅拷贝: 因为复杂（引用）类型的赋值为赋址，只有简单类型的赋值才是赋值，目的就是让数组中的简单类型，赋值给arr2，此时循环arr，然后把arr中的每个简单类型都赋值给arr2，达到只赋值不附址的目的（arr拷贝内容给arr2的目的）
```javascript
let arr = [1,2,3,4];
let arr2 = [];
arr.forEach((e,i)=>{
    arr2[i] = e;
});
let obj = {
    fn: function(){
        console.log(1);
    }
    fn2: function(){
        console.log(2);
    } 
}
let obj = {};
for(let attr in obj){
    if(obj.prototype.hasOwnProperty(attr)){
        obj2[attr] = obj[attr];
    }
}
```

### 原型继承
=> to be continue;