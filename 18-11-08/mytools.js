let obj = (function(){
    function offset(ele) {
        if(ele.nodeType === 1){
            ele = ele;
        }else if (typeof ele === 'string') {
            ele = document.querySelector(ele);
        }else{
            return null;
        }
        //存目标元素的边框
        let bl = ele.clientLeft;
        let bt = ele.clientTop;
        let obj = {
            l:0,
            t:0
        }
        while(ele){
            obj.l += ele.offsetLeft + el .clientLeft;
            obj.t += ele.offsetTop + el .clientTop;
            ele = ele.offsetParent;
        }
        obj.l -= bl;
        obj.t -= bt;
    }
    function dou(ele,attr,n,callback){
        let arr = [];
        let timer = null;
        let num = 0;
        for(let i = n;i > 0;i -= 2){
            arr.push(-i,i);
        }
        arr.push(0);
        let begin = parseFloat(getComputedStyle(ele)[attr]);
        timer = setInterval(()=>{
            ele.style[attr] = arr[num] + 'px';
            num++;
            if(num > arr.length){
                clearInterval(timer);
                num = 0;
                /*
                    当某个条件(事件)成立的时候,触发的函数就叫钩子函数(回调函数)
                */
                callback && callback();
            }
        },16.7)
    }
    function toDou(n){
        return n<10?'0'+n*1:''+n;
    }
    return {
        obj,
        dou,
        toDou
    }
})()