class burgerItem {
    constructor(title, price, calories, classname) {
        this.title = title;
        this.price = price;
        this.calories = calories;
        this.classname = classname;
    }
    render() { // это не одинарная кавычка а кривая кавычка :)
        return `<div class="burger-goods-item"> 
        <h3>${this.title} </h3>
        <p>(${this.price} рублей, ${this.calories} калорий).</p>
        <button class="burger-goods-item-btn-${this.classname}" 
        data-price="${this.price}" data-calories="${this.calories}"  
        onclick="burgerList.summing(this.getAttribute('data-price'), 
        this.getAttribute('data-calories'), this.getAttribute('class'))">buy</button>
        </div>`;
    }
}
class Hamburger {
    constructor() {
        this.goods = [];
        this.priceSumm = 0;
        this.caloriesSumm = 0;
    }
    fetchGoods() {
        this.goods = [
            { title: "Маленький", price: 50, calories: 20, classname: "little" },
            { title: "Большой", price: 100, calories: 40, classname: "big" },
            { title: "С сыром", price: 10, calories: 20, classname: "cheese" },
            { title: "С салатом", price: 20, calories: 5, classname: "salad" },
            { title: "С картофелем", price: 15, calories: 10, classname: "potato" },
            { title: "Приправа", price: 15, calories: 0, classname: "flavoring" },
            { title: "Майонез", price: 20, calories: 5, classname: "mayo" },
        ];
    }
    render() {
        let  listHtml ='';
        this.goods.forEach(good => {
            const goodItem = new burgerItem(good.title, good.price, good.calories, good.classname)
            listHtml += goodItem.render()
        });
        document.querySelector('.fast-food').innerHTML = listHtml;
    }
    summing(price, calories, classname) {
        if (document.querySelector(`.${classname}`).innerHTML == 'buy') {
            document.querySelector(`.${classname}`).innerHTML = 'del';
            this.priceSumm += +price;
            this.caloriesSumm += +calories;
            console.log(classname+" "+price+" "+calories);
        } else {
            document.querySelector(`.${classname}`).innerHTML = 'buy';
            this.priceSumm -= +price;
            this.caloriesSumm -= +calories;
        };
        document.querySelector('.fast-food-summ').innerHTML = "Сумма: " + this.priceSumm + " рублей"+ "<br>"+
         "Энергетическая ценность: " + this.caloriesSumm + "калорий";
        switch(classname) {
            case 'burger-goods-item-btn-little':
                document.querySelector('.burger-goods-item-btn-big').classList.toggle("hidden"); //toggle-переключатель
                break;
            case 'burger-goods-item-btn-big':
                document.querySelector('.burger-goods-item-btn-little').classList.toggle("hidden");
                break;
            case 'burger-goods-item-btn-cheese':
                document.querySelector('.burger-goods-item-btn-salad').classList.toggle("hidden");
                document.querySelector('.burger-goods-item-btn-potato').classList.toggle("hidden");
                break;
            case 'burger-goods-item-btn-salad':
                document.querySelector('.burger-goods-item-btn-cheese').classList.toggle("hidden");
                document.querySelector('.burger-goods-item-btn-potato').classList.toggle("hidden");
                break;
            case 'burger-goods-item-btn-potato':
                document.querySelector('.burger-goods-item-btn-cheese').classList.toggle("hidden");
                document.querySelector('.burger-goods-item-btn-salad').classList.toggle("hidden");
                break;
        }

    }
}

const burgerList = new Hamburger();
burgerList.fetchGoods();
burgerList.render();
