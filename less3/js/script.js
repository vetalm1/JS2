
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

//  makeGETRequest3(`${API_URL}/catalogData.json`)
//      .then((goods) => {
//         console.log('in--', goods); 
//         const list2 = JSON.parse(goods);
//         console.log(list2);})

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

    fetchGoods (){
        makeGETRequest(`${API_URL}/catalogData.json`)
        .then(function GoodsList(goods) {
        let ListGoods = JSON.parse(goods);
        
        function render() {
                let  listHtml ='';
                ListGoods.forEach(good => {
                    const goodItem = new GoodsItem(good.product_name, good.price, good.id_product)
                    listHtml += goodItem.render()
                });
                document.querySelector('.goods-list').innerHTML = listHtml;
            }
        render();
        })
        .catch(function handleErrors(error) {
        console.log(error)
        })
    }

};

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
list.fetchGoods(() => {});