
let{duang} = myTools;
folders.addEventListener('mousedown',function(ev){

    //如果down的时候点中了文件夹,就不能让选框出来
    if(targetP(ev.target,'file-item'))return;
    let id = breadNav.getElementsByTagName('span')[0].dataset.id*1;
    let {left,top} = fBox.getBoundingClientRect();
    let fileItem = folders.getElementsByClassName('file-item');
    let arr = getChild(id);

    //点空白处,清除所有的选中
    for(let i = 0;i < fileItem.length;i++){
        fileItem[i].classList.remove('active');
        if(fileItem[i].children[3]){
            fileItem[i].children[3].className = '';
        }
        checkall.className = '';
        if(arr && arr[i]){
            arr[i].checked = false;
        }
    }
    // console.log(seleEleArr);
    seleEleArr.length = 0;
    // console.log(arr);

    let disX = ev.pageX - left;
    let disY = ev.pageY - top;
    kuang.style.display = 'block';
    kuang.style.left = disX + 'px';
    kuang.style.top = disY + 'px';

    let move = function(ev){
        ev.preventDefault();
        //在拖拽的时候,按下的点和移动的点比,哪边小left和top值就走哪边
        let l = ev.pageX - disX;
        let t = ev.pageY - disY;
        //每次move的时候都把数组清空,为了重新收集被碰撞的元素
        seleEleArr.length = 0;
        kuang.style.width = Math.abs(l - left) + 'px';
        kuang.style.height = Math.abs(t - top) + 'px';
        
        for(let i = 0;i < fileItem.length;i++){
            if(duang(kuang,fileItem[i])){
                fileItem[i].classList.add('active');
                fileItem[i].children[3].className = 'checked';
                seleEleArr.push(data[fileItem[i].dataset.id*1]);
                data[fileItem[i].dataset.id*1].checked = true;
            }else{
                fileItem[i].classList.remove('active');
                fileItem[i].children[3].className = '';
                if(data[fileItem[i].dataset.id*1]){
                    data[fileItem[i].dataset.id*1].checked = false;
                }
            }
        }

        checkall.className = (seleEleArr.length === fileItem.length)?'checked':'';
        kuang.style.left = Math.min(disX,ev.pageX - left) + 'px';
        kuang.style.top = Math.min(disY,ev.pageY - top) + 'px';
    }
    let up = function(){
        kuang.style.width = kuang.style.height = 0;
        kuang.style.display = 'none';

        document.removeEventListener('mousemove',move);
        document.removeEventListener('mouseup',up);
    }
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
});

checkall.onclick = function(){
    let id = breadNav.getElementsByTagName('span')[0].dataset.id*1;
    let arr = getChild(id);
    this.classList.toggle('checked');

    arr && arr.forEach(e => {
        e.checked = this.classList.contains('checked');
    });
    render(id);
}