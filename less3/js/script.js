
const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"
function makeGETRequest(url, callback) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        callback(xhr.responseText);
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

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
    fetchGoods(callback) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            callback();
        });
    }
    render() {
        let  listHtml ='';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price)
            listHtml += goodItem.render()
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

//list.summGoods();
