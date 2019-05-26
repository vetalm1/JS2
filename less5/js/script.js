
const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cartrender: 'false',
        cartgoods: [],
        counter: 0,
        summ: 0
    },
    methods: {
        makeGETRequest (url) {
            return new Promise(function (resolve, reject) {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest(); // not explorer
                } else if (window.ActiveXObject) { 
                    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //explorer
                }
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve(JSON.parse(xhr.response));
                            } else {reject(xhr.readyState)}
                        }
                    }
                xhr.open("GET", url);
                xhr.send();
            })
        },
        filterGoods(value) {
            const regexp = new RegExp(value, "i")
            console.log(regexp);
            this.filteredGoods = this.goods;
            this.filteredGoods = this.filteredGoods.filter(good =>  regexp.test(good.product_name));
        },
        cartAdd(name, price, id) {
            //console.log(name + " " +price)
            let massElem = {product_name: name, price: price, id_product: id};
            this.cartgoods.push(massElem);
            this.counter +=1;
            this.summ +=price;
        },
        cartRemove(name, price, id) {
            let index = {product_name: name, price: price, id_product: id}
            this.cartgoods.splice(index, 1);
            this.counter -=1;
            this.summ -=price;
        }
    },
    mounted() {
        // Сработает сразу
        this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = goods;
            this.filteredGoods = goods;
        });
    }
  });