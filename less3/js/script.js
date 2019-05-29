
const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"

const makeGETRequest = (url) => {
    return new Promise(function (resolve, reject) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest(); // not explorer
          } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); //explorer
          }
            //xhr.timeout = 2000;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {reject(xhr.readyState)}
                }
            }
            xhr.open("GET", url);
            xhr.send();
    })
}

class GoodsItem {
    constructor(title="on design", price="on design", id_product="0") {
        this.title = title;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `<div class="goods-item">
        <img src="img/${this.id_product}.jpg">
        <h3>${this.title}</h3>
        <p>${this.price} р.</p>
        <ol>
         <li>Porro</li>
         <li>Тemo</li>
        </ol>
        <button data-id="${this.id_product}" >Buy</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
        this.counter = 0;
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            }).catch(error => {
            console.log(error)
            })
    }
    filterGoods(value) {
        const regexp = new RegExp(value, "i")
        this.filteredGoods = this.filteredGoods.filter(good =>  regexp.test(good.product_name));
        this.render();
     }

    addEvents(cart) {
        const buttons = [...document.querySelectorAll('.goods-item button')]; //делает массив из списка элементов -
        buttons.forEach((button) => {                                  // - спрэд оператор
            button.addEventListener('click', (e) => {
                e.preventDefault();//предотвратить событие поумолчанию
                const id = e.target.getAttribute('data-id');
                const product = this.goods.find((item) => {
                 return item.id_product == id
                })
                console.log(product);
                cart.add(product);
            })
        })
    }
    render(cart) {
        let  listHtml ='';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product)
            listHtml += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        this.addEvents(cart);
    }
}

class CartItem extends GoodsItem {
    constructor(title="on design", price="on design", id_product="0") {
        super(title, price, id_product);
        this.title = title;
        this.price = price;
        this.id_product = id_product;
        let count = 1;
    }
    render() {
        return `<div class="goods-item-basket">
        <img src="img/${this.id_product}.jpg">
        <h3>${this.title}</h3>
        <p>${this.price} р.</p>
        <button data-id="${this.id_product}" >Del</button>
        </div>`;
    }

    getCount() {
        return count;
    }
    setCount(newCount) {
        count=newCount;
    }
}

class Cart  extends GoodsList {
    constructor() {
        super();
    }
    add(product){
        makeGETRequest(`${API_URL}/addToBasket.json`).then(() => {
            console.log(cart);
            this.goods.push(product);
            //this.render();
            this.counter +=1;
            document.querySelector('.cart-button').innerHTML = "Корзина ("+this.counter+")";
        })
    };
    removeEvents() {
        const buttons = [...document.querySelectorAll('.goods-item-basket button')]; //делает массив из списка элементов -
        buttons.forEach((button) => {                                  // - спрэд оператор
            button.addEventListener('click', (e) => {
                e.preventDefault();//предотвратить событие поумолчанию
                const id = e.target.getAttribute('data-id');
                const index = this.goods.find((item) => {
                 return item.id_product == id
                })
                this.remove(index);
            })
        })
    }
    render() {
        let  listHtml ='';
        let summ = 0;
        this.goods.forEach(good => {
            const goodItem = new CartItem(good.product_name, good.price, good.id_product)
            listHtml += goodItem.render()
            summ +=good.price;
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
        document.querySelector('.cart-summ').innerHTML = summ+" р.";
        this.removeEvents();
    }
    update(newCount){
        this.goods[index].setCount(newCount);
    }
    remove(index){
        makeGETRequest(`${API_URL}/deleteFromBasket.json`).then(() => {
         this.goods.splice(index, 1);
         this.counter -=1;
         document.querySelector('.cart-button').innerHTML = "Корзина ("+this.counter+")";
         //console.log(cart);
         this.render();
        })
    };
}


const list = new GoodsList();
const cart = new Cart();

list.fetchGoods().then(() => {
    list.render(cart);
}).catch((err) => console.error(err));
const cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', (e) => {
    e.preventDefault();
    cart.render();
  })

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.goods-search');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = searchInput.value
  list.filterGoods(value)
})

let str = " 'Lorem 'ipsum dolor' sit amet, 'consectetur' adipiscing, aren't'"
console.log('Строка Оригинал - '+str);
console.log('Задание 1 -' + str.replace(/'/g, '"'));
console.log('Задание 2 -' + str.replace(/\B'|'\B/gm, '"'));
console.log('Задание 2.v2 -' + str.replace(/(?<=\s)'|'(?!\w)/g, '"'));
