const folders = document.getElementsByClassName('folders')[0];
function refresh(){
    const fileItem = document.querySelectorAll('.folders .file-item');
    for (let i = 0; i < fileItem.length; i++) {
        fileItem[i].addEventListener('dblclick',dblEn);
    }
}
refresh();
function dblEn(ev){
    let arr = [];
    if(!(ev.target.className === 'file-item')){
        let evp = ev.target.parentNode;
        for(let i in data){
            if(data[i].pid == evp.dataset.id){
                arr.push(data[i].id);
            }
        }
    }else{
        for(let i in data){
            if(data[i].pid == ev.target.dataset.id){
                arr.push(data[i].id);
            }
        }
    }
    function enterRender(){
        let temp = '';
        if(arr[0]){
            arr.forEach(e=>{
                temp += `
                    <div class="file-item" data-id="${e}">
                        <img src="img/folder-b.png">
                        <span class="folder-name">${data[e].title}</span>
                        <input type="text" class="editor">
                        <i class="${data[e].checked?checked:''}"></i>
                    </div>
                `
            });
        }else{
            const fEmpty = document.getElementsByClassName('f-empty')[0];
            fEmpty.style.display = 'block';
            fEmpty.style.width = '1101px';
            fEmpty.style.height = '500px';

        }
        folders.innerHTML = temp;
    }
    enterRender();
    refresh();
    dRefresh();
    checkedBox();
}