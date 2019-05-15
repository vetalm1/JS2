
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

function makeGETRequest2(url) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.timeout = 2000;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(xhr.status)
          }
        }
      }
      xhr.ontimeout = () => {
        reject('timeout')
      }
      xhr.open('get', url)
      xhr.send();
    })
  }
  
  makeGETRequest2(`${API_URL}/catalogData.json`)
    .then(function GoodsList(goods) {
      console.log('in this case goods ', goods)
      const list = JSON.parse(goods)
      console.log(list);
    })
    .catch(function handleErrors(error) {
      console.log('ignoring the then statement ', error)
    })

 const makeGETRequest3 = (url) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
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

 makeGETRequest3(`${API_URL}/catalogData.json`)
     .then((goods) => {
        console.log('in  ', goods); 
        const list2 = JSON.parse(goods);
        console.log(list2);
     })


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
    // constructor() {
    //     this.goods = []
    // }
    // fetchGoods(callback) {
    //     makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    //         this.goods = JSON.parse(goods);
    //         callback();
    //     });
    // }
    fetchGoods (){
        makeGETRequest3(`${API_URL}/catalogData.json`)
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
//     render() {
//         let  listHtml ='';
//         this.goods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price)
//             listHtml += goodItem.render()
//         });
//         document.querySelector('.goods-list').innerHTML = listHtml;
//     }
}

const list = new GoodsList();
list.fetchGoods(() => {

});

//list.summGoods();
