

let str = " 'Lorem 'ipsum dolor' sit amet, 'consectetur' adipiscing, aren't'"
console.log('Строка Оригинал - '+str);
console.log('Задание 1 -' + str.replace(/'/g, '"'));
console.log('Задание 2 -' + str.replace(/\B'|'\B/gm, '"'));
console.log('Задание 2.v2 -' + str.replace(/(?<=\s)'|'(?!\w)/g, '"'));
