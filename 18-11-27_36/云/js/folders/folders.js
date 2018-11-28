//可以获取一些共用的元素
const folderBox = document.getElementsByClassName('folder-content')[0];
const folders = folderBox.getElementsByClassName('folders')[0];
const breadmenu = folderBox.getElementsByClassName('breadmenu')[0];
const checkall = folderBox.getElementsByClassName('checkall')[0].children[0];
const breadNav = folderBox.getElementsByClassName('bread-nav')[0];
const fEmpty = folderBox.getElementsByClassName('f-empty')[0];
const kuang = folderBox.getElementsByClassName('kuang')[0];
let seleEleArr = [];
const {getChild,addAttr,getParent,getParents,parentArr,targetP} = myTools;
const {log,dir} = console;

addAttr('num',[]);

function render(id){
    kuang.style.display = 'none';
    folders.innerHTML = '';
    //只要render九八数据清空
    seleEleArr.length = 0;
    //有没有子级,没有子级就把暂无文件元素打开
    let arr = getChild(id);
    if(!arr){
        fEmpty.style.display = 'block';
        checkall.classname = '';
    }else{
        checkall.className = arr.every(e=>e.checked)?'checked':'';
        fEmpty.style.display = 'none';
        arr.forEach(e => {
            //捕获被选中的数据id
            if(e.checked){
                seleEleArr.push(e);
            }
            //文件夹的盒子
            let div = document.createElement('div');
            div.className = e.checked?'file-item active':'file-item';
            div.dataset.id = e.id;

            let img = new Image();
            img.src = 'img/folder-b.png';
            img.ondblclick = function(){
                render(e.id);
                renderMenu(e.id);
                //还需要清除这些元素选中的样式
                arr.forEach(e=>e.checked = false);
            }

            //文件的名字
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;

            //重命名需要用的
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'editor';
            input.value = e.title;

            //是否被选中
            let i = document.createElement('i');
            i.className = e.checked?'checked':'';
            i.onclick = function(){
                data[e.id].checked = !data[e.id].checked;
                render(id);
            }

            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);

            folders.appendChild(div);
        });
    }
}

render(0);
