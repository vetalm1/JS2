
class GoodsItem {
    constructor(title="on design", price="on design", img="0") {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
        <img src="img/${this.img}.jpg">
        <h3>${this.title}</h3>
        <p>${this.price} $</p>
        <ol>
         <li>Porro</li>
         <li>Тemo</li>
        </ol>
        <button>Buy</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150, img: 1 },
            { title: "Soks", price: 50, img: 2 },
            { title: "Jacket", price: 350, img: 3 },
            { title: "Jacket-black", img: 4},
            { title: "Shoes", price: 250, img: 5 }
        ];
    }
    render() {
        let  listHtml ='';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img)
            listHtml += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    summGoods() {
        let summ = 0;
        this.goods.forEach(good => {
            if (good.price!=undefined) {
                summ += good.price;
            }
        });
        document.querySelector('.goods-list2').innerHTML = 
        '<h3>Cуммарная стоимость всех товаров = '+summ+' $<h3>';
    }
    calcPrice() { // альтернативный вариант реализации summGoods
        return this.goods.reduce((sum, curr) => {
            if (!curr.price) return sum; // это частый способ проверки
            return sum+curr.price
        }, 0)
    }
}

class Cart  extends GoodsList {
    add(){}
    update(newCount){
        this.goods[index].setCount(newCount);
    }
    remove(index){
        this.goods.splice(index, 1);
    }
}

class CartItem extends GoodsItem {
    constructor(title="on design", price="on design", img="0") {
        super();
        let count = 1;
    }
    getCount() {
        return count;
    }
    setCount(newCount) {
        count=newCount;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.summGoods();
