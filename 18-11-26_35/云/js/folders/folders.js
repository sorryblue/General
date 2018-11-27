/* 
    可以获取一些共用的元素有
*/
const folderBox = document.getElementsByClassName('folder-content')[0];
const folders = folderBox.getElementsByClassName('folders')[0];
const breadmenu = folderBox.getElementsByClassName('breadmenu')[0];
const checkall = folderBox.getElementsByClassName('checkall')[0];
const breadNav = folderBox.getElementsByClassName('bread-nav')[0];
const fEmpty = folderBox.getElementsByClassName('f-empty')[0];
const {getChild,addAttr,getParent,getParents,parentArr} = myTools;

function render(id){
    folders.innerHTML = '';
    //有没有子级,没有子级就把暂无文件元素打开
    let arr = getChild(id);
    if(!arr){
        fEmpty.style.display = 'block';
    }else{
        fEmpty.style.display = 'none';
        arr.forEach(e => {
            //文件夹的盒子
            let div = document.createElement('div');
            div.className = e.checked?'file-item active':'file-item';
            let clickFlag = null;
            div.addEventListener('click',function(){
                if(clickFlag){
                    clearTimeout(clickFlag);
                }
                clickFlag = setTimeout(function() {
                    data[e.id].checked = !data[e.id].checked;
                    render(id);
                    checked(id);
                }, 300);
            });
            div.addEventListener('dblclick',function(){
                if(clickFlag){
                    clearTimeout(clickFlag);
                    render(e.id);
                    renderMenu(e.id);
                    checked(e.id);
                }
                arr.forEach(e=>e.checked=false);
            });

            let img = new Image();
            img.src = 'img/folder-b.png';

            //文件的名字
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;

            //重命名
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'editor';

            //是否被选中
            let i = document.createElement('i');
            i.className = e.checked?'checked':'';

            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);

            folders.appendChild(div);
        });
    }
}

render(0);