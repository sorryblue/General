function checked(id){
    let arr = getParents(id);
    let checkArr = getChild(arr[arr.length - 1].id);
    let checkI = document.getElementById('checkedAll');

    let k = 0;
    let onOff = false;
    if(checkArr){
        checkArr.forEach(e=>{
            k += e.checked*1
        });
        if(k === checkArr.length){
            checkI.className = 'checked';
            onOff = true;
        }else{
            checkI.className = '';
            onOff = false;
        }
        checkI.onclick = function(){
            onOff = !onOff;
            checkArr.forEach(e=>{
                if(onOff){
                    e.checked = true;
                    checkI.className = 'checked';
                }else{
                    e.checked = false;
                    checkI.className = '';
                }
            });
            render(id);
        }
    }else{
        checkI.className = '';
        checkI.onclick = function(){
            checkI.className = '';
        }
    }

    // checkI.onclick = function(){
    //     onOff = !onOff;
    //     if(onOff){
    //             checkArr.forEach(e=>{
    //                 e.checked = true;
    //             });
    //             checkI.className = 'checked';
    //     }else{
    //             checkArr.forEach(e=>{
    //                 e.checked = false;
    //             });
    //             checkI.className = '';
    //     }
    //     render(id);
    // }
}
checked(0);