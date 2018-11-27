let myTools = (function(){
    /*
        通过父级的id获取子级
    */
    function getChild(pid){
        if(!data[pid])return null;
        let arr = [];//空数组不是false,如果[] === false会调用toString变成''
        let onOff = false;
        for(let attr in data){
            if(data[attr].pid === pid){
                arr.push(data[attr]);
                onOff = true;
            }
        }
        if(onOff){
            return arr;
        }else{
            return null;
        }
    }

    /*
        通过id找pid
    */
    function getParent(id){
        /*
            如果没有id对应的这个数据 或者 当前id数据的pid为-1 说明当前是微云,微云上面没有数据了
        */
        if(!data[id] || data[id].pid === -1)return null;
        return data[data[id].pid];
    }
    function getParents(id){//找祖先的合计
        let parentArr = [];
        let now = data[id];//当前的id
        while(now){
            parentArr.unshift(now);
            now = getParent(now.id);
        }
        return parentArr;
    }

    function addAttr(attr,value){//设置data的子级内的属性addAttr(num,0)
        for(let k in data){
            data[k][attr] = value;
        }
    }
    
    return{
        getChild,
        addAttr,
        getParent,
        getParents
    }
})();