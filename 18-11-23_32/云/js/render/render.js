function render(){
    const folders = document.getElementsByClassName('folders')[0];
    // let arr = [];
    // for(let i in data){
    //     arr.push(data[i]);
    // }
    let temp = '';
    for (let i in data) {
        if(data[i].pid === 0){
        temp += `
            <div class="file-item" data-id="${data[i].id}">
                <img src="img/folder-b.png">
                <span class="folder-name">${data[i].title}</span>
                <input type="text" class="editor">
                <i class="${data[i].checked?checked:''}"></i>
            </div>
        `
    }

        }
    folders.innerHTML = temp;
}
render();