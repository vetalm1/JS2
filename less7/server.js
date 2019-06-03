const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(express.static(".")); //для отдачи статичных данных
app.use(bodyParser.json()); // Указываем, что содержимое - JSON

app.get("/catalogData", (req, res)=>{
    
    fs.readFile("catalog.json", "UTF-8", (err, data)=>{
        res.send(data)
    })
})

app.post("/addToCart", (req, res)=>{
    fs.readFile("cart.json", "UTF-8", (err, data)=>{
        if (err) {res.send('{"result": 0}'); return;}
        const cart = JSON.parse(data);
        const item = req.body;
        console.log(req.body);
        cart.push(item);

        fs.writeFile("cart.json", JSON.stringify(cart), (err)=>{
            if (err) {
                res.send('{"result": 0}');
            } else {
                res.send('{"result": 1}');
            }
        })

    })
    console.log(req.body);
})

app.post("/removeFromCart", (req, res)=>{
    fs.readFile("cart.json", "UTF-8", (err, data)=>{
        if (err) {res.send('{"result": 0}'); return;}
        const cart = JSON.parse(data);
        const item = req.body;
        console.log(req.body);
       // cart.push(item);
        cart.splice(item, 1)
        fs.writeFile("cart.json", JSON.stringify(cart), (err)=>{
            if (err) {
                res.send('{"result": 0}');
            } else {
                res.send('{"result": 1}');
            }
        })
    })
    console.log(req.body);
})

app.listen(3000, () =>{
    console.log("Server is running on port 3000")
})



