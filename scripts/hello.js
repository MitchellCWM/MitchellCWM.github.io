var test1 = ["hello", true, 5];
var test2 = ["bye", false];
var numberTest = 23;
function getLength(s) {
    return s.length;
}
var lengthTest1 = "hello";
var lengthTest2 = [];
lengthTest2[0] = "bye";
lengthTest2[1] = "good day";
console.log(getLength(lengthTest1));
console.log(getLength(lengthTest2));
console.log(typeof (test1));
console.log(typeof (typeof (lengthTest2)));
