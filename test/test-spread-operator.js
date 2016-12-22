/**
 * Created by chotoxautinh on 11/23/16.
 */
let obj = {
    a: 1,
    b: 2
};

function add(a, b) {
    console.log(a);
    console.log(b);
    return a+b;
}

console.log(add(...obj));
