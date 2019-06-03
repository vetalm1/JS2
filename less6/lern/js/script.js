
Vue.component("name2-component", {
    template: "<p> <name-component v-for='n in 2'></name-component> {{name}}  Vue</p>",
    data: () => ({
        name: "Frodo"
    })
});

Vue.component("name-component", {
    template: "<span>Hello--</span>",
});

Vue.component("name3-component", {
    template: "<div>{{name1}}</div>",
    props: ["name1"]
});

const app = new Vue({
    el: '#app',
    data: {
        someField: "",
    },
    
  });

