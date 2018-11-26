const checkedAll = document.getElementById('checkedAll');
function checkedBox(){
    const folders = document.getElementsByClassName('folders')[0];
    const fileItem = folders.querySelectorAll('.file-item');
    checkedAll.className = '';
    let fileItArr = Array.from(fileItem);
    if(!fileItArr.length){
        checkedAll.className = '';
    }else{
        let arr =[];
        fileItArr.forEach(e=>{
            arr.push(e.dataset.id*1);
        });
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        for(let p in data){
            arr3.push(data[p].id);
            arr4.push(data[p].checked);
        }
        for(let i = 0;i < arr.length;i++){
            for(let j = 0;j < arr3.length;j++){
                if(arr3[j] == arr[i]){
                    arr2.push(arr4[j]);
                }
            }
        }
            let m = 0;
        arr2.forEach(e=>{
            m += e*1;
        });
        let onOff = null;
        if(m === arr2.length){
            onOff = true;
        }else{
            onOff = false;
        }
        if(onOff){
            checkedAll.className = 'checked';
        }else{
            checkedAll.className = '';
        }
    }
}
checkedAll.addEventListener('click',cheCli);
let cheOnOff = false;
function cheCli(){
    checkedAll.className = 'checked';
}
cheOnOff = !cheOnOff;