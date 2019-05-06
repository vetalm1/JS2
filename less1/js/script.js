const goods= [
    { title: "Shirt", price: 150, img: 1 },
    { title: "Soks", price: 50, img: 2 },
    { title: "Jacket", price: 350, img: 3 },
    { title: "Jacket-black", img: 4}, //для цены добавить значения поумолчанию
    { title: "Shoes", price: 250, img: 5 }
]

const renderGoodsItem = (title, price, img) => {
    let priceOutput = '$'+price; // добавляем знак "$"
    if (price==undefined) {priceOutput="on design"} // проверка на отсутствие значения "цена"
    return `<div class="goods-item">
    <img src="img/${img}.jpg">
    <h3>${title}</h3>
    <p>${priceOutput}</p>
    <ol>
     <li>Porro</li>
     <li>Тemo</li>
     <li>Cum odio</li>
    </ol>
    <button>Buy</button>
    </div>`;
}

const renderGoodsList = (list) => {
    const goodsList = list.map((item) => 
                        renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
// *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
// Это происходит т.к. goodsList сформирован в виде массива.
// Можно воспользоваться .join('') например, или forEach..


let b='';
goods.forEach(item => {
    b=b+`<div class="goods-item">
    <img src="img/${item.img}.jpg">
    <h3>${item.title}</h3>
    <p>${item.price}</p>
    <ol>
     <li>Porro</li>
     <li>Тemo</li>
     <li>Cum odio</li>
     <li>Aperiam </li>
    </ol>
    <button>Buy</button>
    </div>`;
});
   document.querySelector('.goods-list2').innerHTML=b;