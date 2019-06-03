
//const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
Vue.component("goods-item",{
    props: ["good"],
    methods: {
        addCart(name,price,id){
         //   console.log(name,price,id);
            this.$emit("addtest", name,price,id)
        }
    },
    template: `<div class="goods-item">
    <img :src="'img/'+good.id_product+'.jpg'">
    <h3>{{good.product_name}}</h3>
    <p>{{good.price}}</p>
    <ol>
        <li>Lorem</li>
        <li>Ipsum</li>
    </ol>
    <button @click="addCart(good.product_name, good.price, good.id_product)" >Buy</button>
    </div>`
});
Vue.component("goods-list", {
    methods: {
        addtest(name,price,id) {
            this.$emit("cart-add", name, price, id)
        }
    },
    props: ["goods"],
    template: `<div class="goods-list">
     <goods-item v-for="good in goods" :good="good" :key="good.id_product" @addtest="addtest"></goods-item>
    </div>`,
});
Vue.component("search", {
    data: () => ({
        searchLine: ""
    }),
    methods: {
        onSubmit() {
            this.$emit("submit", this.searchLine)
        }
    },
    template: `<form  @submit.prevent="onSubmit">
    <input class="goods-search" type="text" v-model.trim="searchLine">
    <button type="submit" class="search-button">Искать</button>
    </form> `,

});
Vue.component("goods-item-basket",{
    props: ["good"],
    methods: {
        addCart(name,price,id){
         //   console.log(name,price,id);
            this.$emit("addtest", name,price,id)
        }
    },
    template: `<div class="goods-item-basket">
    <img :src="'img/'+good.id_product+'.jpg'">
    <h3>{{good.product_name}}</h3>
    <p>{{good.price}}</p>
    <ol>
        <li>Lorem</li>
        
        <li>Ipsum</li>
    </ol>
    <button @click="addCart(good.product_name, good.price, good.id_product)" >Del</button>
    </div>`
});
Vue.component("cart", {
    methods: {
        closeCart(){
            this.$emit('close')
        },
        addtest(name,price,id) {
            this.$emit("cart-remove", name, price, id)
        }
    },
    props: ["goods"],
    template: `
    <div class="cart-list">
        <div class="cart-list-wraper">
        <span class="cart-title">Корзина</span>
        <goods-item-basket v-for="good in goods" :good="good" :key="good.id_product" @addtest="addtest" ></goods-item-basket>
        <span class="close" @click="closeCart">Закрыть</span>
        </div>
    </div>`,

});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        //searchLine: '',
        isVisibleCart: false,
        cartgoods: [],
        counter: 0,
        summ: 0
    },
    computed: {
        noData() {
            return this.filteredGoods.length === 0;
        }
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
        makePOSTRequest (url, data) {
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
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                xhr.send(JSON.stringify(data));
            })
        },
        filterGoods(searchLine) {
            const regexp = new RegExp(searchLine, "i")
            console.log(regexp);
            this.filteredGoods = this.goods;
            this.filteredGoods = this.filteredGoods.filter(good =>  regexp.test(good.product_name));
        },
        showCart(){
            this.isVisibleCart = true
        },
        hideCart(){
            this.isVisibleCart = false
        },
        cartAddtest(){
            console.log("555")
        },
        cartAdd(name, price, id) {
            let massElem = {product_name: name, price: price, id_product: id};
            this.cartgoods.push(massElem);
            this.counter +=1;
            this.summ +=price;
            console.log(this.cartgoods);
            this.makePOSTRequest(`/addToCart`, massElem).then((data) => {
            //    console.log(data);
            });
        },
        cartRemove(name, price, id) {
            let index = {product_name: name, price: price, id_product: id}
            this.cartgoods.splice(index, 1);
            this.counter -=1;
            this.summ -=price;
            this.makePOSTRequest(`/removeFromCart`, index).then((data) => {
           //     console.log(data);
            });
        }
    },
    mounted() {
        // Сработает сразу
        this.makeGETRequest(`/catalogData`).then((goods) => {
            console.log(goods);
            this.goods = goods;
            this.filteredGoods = goods;
        });
    }
  });