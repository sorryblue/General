function dRefresh(){
    const fileItem = document.querySelectorAll('.folders .file-item');
    for (let i = 0; i < fileItem.length; i++) {
        let onOff = true;
        fileItem[i].addEventListener('click',lEn);
        function lEn(ev){
            let arr = [];
            for(i in data){
                arr.push(data[i]);
            }
            if(!(ev.target.className === 'file-item')){
                arr.forEach(e=>{
                    let evp = ev.target.parentNode;
                    let i = evp.getElementsByTagName('i')[0];
                    if(e.id == evp.dataset.id){
                        e.checked = onOff;
                        if(e.checked){
                            i.className = 'checked';
                            for(let i in data){
                                data.id == e.id?i.checked = true:i.checked = false;
                            }
                        }else{
                            i.className = '';
                            for(let i in data){
                                data.id == e.id?i.checked = true:i.checked = false;
                            }
                        }
                    }
                });
            }else{
                arr.forEach(e=>{
                    let i = ev.target.getElementsByTagName('i')[0];
                    if(e.id == ev.target.dataset.id){
                        e.checked = onOff;
                        if(e.checked){
                            i.className = 'checked';
                            for(let i in data){
                                data.id == e.id?i.className = true:i.className = false;
                            }
                        }else{
                            i.className = '';
                            for(let i in data){
                                data.id == e.id?i.className = true:i.className = false;
                            }
                        }
                    }
                });
            }
            onOff = !onOff;
            checkedBox();
        }
    }
}
dRefresh();