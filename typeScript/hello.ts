type myTuple = [String, boolean,number?];

let test1: myTuple = ["hello", true, 5];
let test2: myTuple = ["bye",false];

let numberTest = 23;


function getLength(s : string | string[]): number{
    return s.length;
}


let lengthTest1 = "hello";
let lengthTest2: string[] = [];
lengthTest2[0] = "bye";
lengthTest2[1] = "good day";

console.log(getLength(lengthTest1));


console.log(getLength(lengthTest2));

console.log(typeof(test1));
console.log(typeof(typeof(lengthTest2)));