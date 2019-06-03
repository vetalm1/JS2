const http = require("http");
const  static = require("node-static");

const file = new static.Server("."); //текущая папка

http.createServer((rec, res) => {
    file.serve(rec, res);
}).listen(3000);