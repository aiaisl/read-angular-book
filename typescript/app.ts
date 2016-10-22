var data = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];
data.forEach(function(line){console.log(line)});

var typeData: string[] = data;
typeData.forEach((line)=>console.log(line));


var evens = [2, 4, 6, 8];
var odds = evens.map(v=>v+1);
console.log(odds);