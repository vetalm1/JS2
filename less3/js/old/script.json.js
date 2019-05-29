// let xhr;
// if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest()
// } else if (window.ActiveZobject) {
//     xhr = new ActiveXObject("Microsoft.XMLHTTP")
// }

// xhr.onreadystatechange = function() {
//  if (xhr.readyState===4) return;
//  if (xhr.status===200) { //это выполненый полностью запрос
//    consolelog(xhr.responseText);
//  } else {
//      console.error(xhr.responseText);
//  }
// }
// xhr.open("GET", "http://example.com");
// xhr.send()

// const async1 = (a, cb) => {
//     setTimeout(()=> {
//         const b= a+1;
//         cb(b);
//     }, 200)
// }
// async1(5, (b)) => {
//     console.log(b);
// }

const async = (a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a) {
                const b=a+1;
                resolve(b);
            } else {
                reject("error")
            }
      }, 2000)
    })
}

let ccc;
async(5).then((b) => {
    console.log(b)
    ccc=b;
}).catch((err)=> {
    console.error(err);
})

setTimeout(2000);
console.log("aaa = " +ccc);