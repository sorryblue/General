### 原型继承
- 原型继承主要是继承**父类原型**上的属性或者方法
    1. 创建一个空的构造函数
    2. 把空构造函数的原型等于父类的原型
    3. 把子类的原型等于空构造函数的实例对象
    - 这样就达到了继承属性的目的（注意：手动修正constructor指向）
```javascript
function Xhh(){}//炮灰
Xhh.prototype = Person.prototype;
Coder.prototype = new Xhh;

Coder.prottype = new Person;(如果Person上没有复杂的运算的话，可以直接这样写,因为这样会把Person运行一遍，再把返回值给他)
```
- 只有附址之后，两个对象地址为同一个，修改一个才会影响另外一个
- 实例化对象没有会去他的构造函数的原型上去查找
- 实例化对象不等于构造函数的原型（因为不是一个地址，但是又通过原型链找到他的构造函数的原型）

### 寄生式组合式继承
```javascript
let obj = {};
let obj2 = Object.create(obj);
```
- 使用object的create方法
    1. 创建一个空对象
    2. 让新创建的空对象的_proto_指向第一个传递进来的对象
- `Object.assign({},{key:val})//类似拷贝||Obgect.assian(Coder.prototype,{key:val})`

### Object 的静态方法(静态方法：在类身上的方法，动态方法：在实例身上的方法)
1. Object.assign():将多个对象的可枚举属性拷贝到目标对象上，并且返回赋值后的目标对象，从右向左赋值,只有最左边的对象改变了（浅拷贝）
```javascript
let obj = {
    name: 'xx',
    age: 99,
    sex: 'man'
}
let obj3 = {
    name: 'yy',
    age: 88,
    job: '爬'
}
let obj2 = Object.assign({},obj);//obj2 = {name: 'xx',age:99,sex:'man'}
let obj2 = Object.assign({},obj,obj3);//obj2 = {name:'yy',age:88,sex:'man',job:'爬'} obj = {name:'xx',age:99,sex:'man'}
let obj2 = Object.assign(obj,obj3);//obj = {name:'yy',age:88,job:'爬',sex:'man'}
```
2. Obejct.defineProperfities()://能够修改对象中的多个属性
3. Object.defineProperfity()://能够修改对象中的一个属性，所谓的数据劫持//**被对象抱着才能这样写（set(){} == set:function(){}）**
```javascript
Object.defineProperty(obj,{
    name:{
        value: 'ss'
    },
    get: function(){

    }
})
```
- Object.defineProperties(obj,props)
    - obj:被添加属性的对象
    - props：添加或更新的属性对象（如果是新添加的属性，一定要设置是否可枚举）

### ES6的class
```javascript
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    static say(){
        console.log('静态方法')//静态方法：类使用的方法
    }
    say(){
        console.log(this.name)//动态方法：这样的写法就等同于把方法挂在原型上了，实例使用的方法
    }
    runing(){
        console.log(this.age)
    }
}
let t = Person('xx',10);
Person.say();
t.say();
```

### ES6中的继承
```javascript
class Peason {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    say(){
        console.log('我叫' + this.name + '今年' + this.age);
    }
}
//声明子类通过extends父类就继承父类了
class Coder extends Person{
    /*
        在子类constructor中填写属性的小技巧
        专属于子类的属性卸载参数的前面，父类的属性放在后面
        这样一来，就能直接使用...arg
        ...arg
            把函数中的多余的参数放到数组中体现出来
    */
    
    constructor(job,...arg){
        super(...arg);//等同于调用父类，把多余的参数（和父类一样的属性）放到super中，达到继承父类属性的目的
        /*
            在继承里面，写constructor必须写super，super下面才能使用this，super有暂存死区（super上面不能使用this）
        */
        this.job = job;//自己私有的属性，直接this.即可
    }
}
let c = new Coder('xx',10);
c.say();
```

### 面向对象的继承方式
```javascript
/*
    call继承
        继承属性
        调用父类，通过call改变this
    拷贝继承
        for in 去掉非父类原型自身的属性
    原型继承
        function Xhh(){}
        Xhh.prototype = Parent.prototype
        child.protptype = new Xhh
    寄生式组合式继承
        child.prototype = Object.create(Parent.prototype)
    对象继承
        obj2._proto_ = obj
    extends
        class 子类的名字
*/