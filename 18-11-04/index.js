function ClearTime(id){
    this.main = document.getElementById(id);
    this.bg = this.main.getElementsByClassName('bg')[0];
    this.inputDate = this.main.getElementsByClassName('inputdate')[0];
    this.tm = this.main.getElementById('tm');
    this.price = this.main.getElementsByClassName('price')[0];
    this.bigC = this.main.getElementsByClassName('big-c')[0];
    this.footer = document.getElementById('footer');
    this.list = this.footer.getElementsByClassName('list')[0];
    this.li1 = this.list.getElementsByClassName('li1')[0];
    this.li2 = this.list.getElementsByClassName('li2')[0];
    this.li3 = this.list.getElementsByClassName('li3')[0];
}
