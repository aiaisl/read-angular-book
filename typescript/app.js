var data = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];
data.forEach(function (line) { console.log(line); });
var typeData = data;
typeData.forEach(function (line) { return console.log(line); });
var evens = [2, 4, 6, 8];
var odds = evens.map(function (v) { return v + 1; });
console.log(odds);
