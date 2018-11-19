// const ul = document.querySelector('.box .list');
// let temp = '';
// commodity.forEach(d => {
//     temp += `
//         <li>
//             <i class="down"></i>
//             <em>0</em>
//             <i class="up"></i>
//             <span>
//                 单价：<strong>${d.dPriceC}元</strong> 小计：<strong>${d.zPriceC}元</strong>
//             </span>
//         </li>
//         <li>
//     `;
// });
// ul.innerHTML = temp;

// const lis = Array.from(document.querySelectorAll('.list li'));
// const liEm = lis[0].querySelector('em');
// const iDown = lis[0].querySelector('.down');
// const iUp = lis[0].querySelector('.up');
// const price = lis[0].querySelectorAll('span strong');
// let dPrice = parseFloat(price[0].innerHTML);
// let num = 0;
// let numPrice = 0;
// iDown.onclick = function(){
//     num--;
//     if(num < 0){
//         num = 0;
//     }
//     liEm.innerHTML = num;
//     price[1].innerHTML = num*dPrice + '元';
// }
// iUp.onclick = function(){
//     num++;
//     if(num > 9){
//         num = 9;
//     }
//     liEm.innerHTML = num;
//     price[1].innerHTML = num*dPrice + '元';
// }