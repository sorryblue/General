const main = document.getElementById('main');
const footer = document.getElementById('footer');
const uls = main.getElementsByTagName('ul')[0];
const lis = uls.getElementsByTagName('li');
const ulf = footer.getElementsByTagName('ul')[0];
const lif = ulf.getElementsByTagName('li');
let priceDol = 0;
let price = document.createElement('div');
for (let i = 0; i < lis.length; i++) {
    const inps = lis[i].getElementsByTagName('input');
    const ps = lis[i].getElementsByTagName('p');
    const bg = lis[i].getElementsByClassName('bg');
    const divs = lis[i].getElementsByTagName('div');
    const itemh = lis[i].getElementsByTagName('h5');
    const spans = ps[0].getElementsByTagName('span');
    const pspll = ps[1];
    const money = pspll.getElementsByClassName('price');
    let bgs = bg[0];
    // console.log(bgs);
    let moneyss = money[0].innerHTML;
    let monnum = moneyss.split('¥');
    let monDol = monnum[1];
    let item = itemh[0].innerHTML;
    inps[1].onclick = function () {
        clearInterval(timer);
        let text = inps[0].value;
        let newDate = new Date(text);
        var timer = setInterval(dd, 1000);
        function dd() {
            let nowDate = new Date;
            let t = (newDate - nowDate) / 1000;
            let d = Math.floor(t / 86400);
            t %= 86400;
            let h = Math.floor(t / 3600) + d * 24;
            if(h<10) {
                h = '0' + h;
            }
            let hs = h.toString();
            let hss = hs.split('');
            t %= 3600;
            let m = Math.floor(t / 60);
            if(m<10) {
                m = '0' + m;
            }
            let ms = m.toString();
            let mss = ms.split('');
            t %= 60;
            let s = Math.floor(t);
            if(s<10){
                s = '0' + s;
            }
            let ss = s.toString();
            let sss = ss.split('');
            if(!(t>0)){
                divs[2].style.visibility= 'visible';
                divs[2].style.transform = 'scale(1)';
                hss = ['0','0'];
                mss = ['0','0'];
                sss = ['0','0'];
                clearInterval(timer);
                let liDiv = document.createElement('div');
                lif[1].appendChild(liDiv);
                liDiv.style.color = 'white';
                liDiv.style.fontSize = '14px';
                liDiv.innerHTML = moneyss;
                priceDol += +monDol;
                priceDols = priceDol;
                let liDivT = document.createElement('div');
                lif[0].appendChild(liDivT);
                liDivT.innerHTML = item;
                lif[2].appendChild(price);
                price.innerHTML = priceDol;
                bgs.style.display = 'block';
            }
            spans[0].innerHTML = hss[0];
            spans[1].innerHTML = hss[1];
            spans[2].innerHTML = mss[0];
            spans[3].innerHTML = mss[1];
            spans[4].innerHTML = sss[0];
            spans[5].innerHTML = sss[1];
        }
        dd();
    };
}