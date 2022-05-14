import { a, b } from './test';

function func(a, b) {
    console.log(a + b);
}

func(a, b);

class SayHello {
    constructor(name) {
        this.name = name;
    }

    abc() {
        console.log(`Hello ${this.name}`);
    }
}

let name1 = new SayHello('Anik Hossain');
let name2 = new SayHello('Shakil Hossain');

name1.abc();
name2.abc();
